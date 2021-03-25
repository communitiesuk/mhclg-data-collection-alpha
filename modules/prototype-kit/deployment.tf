variable "tags" {
  type        = map(string)
  description = "Tags to use for each resource, will have Name appended where applicable"
}

variable "public_ssh" {
  type        = string
  description = "The public SSH key to use for deployment"
  sensitive   = true
}

variable "private_ssh" {
  type        = string
  description = "The private SSH key to use for deployment"
  sensitive   = true
}

variable "web_password" {
  type        = string
  description = "The basic auth password to use for the prototype (username is mhclg)"
  sensitive   = true
}

resource "aws_key_pair" "prototype_deployment" {
  key_name   = "mhclg-data-collection-prototype-deployment"
  public_key = var.public_ssh
  tags       = var.tags
}

resource "aws_instance" "prototype_server" {
  ami                         = "ami-01c835443b86fe988"
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.prototype_deployment.key_name
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.security_group.id]
  subnet_id                   = aws_subnet.prototype.id

  root_block_device {
    volume_size           = 8
    delete_on_termination = true
  }

  connection {
    host        = self.public_ip
    type        = "ssh"
    user        = "ec2-user"
    private_key = var.private_ssh
  }

  provisioner "remote-exec" {
    inline = [
      "curl --silent --location https://rpm.nodesource.com/setup_14.x | sudo bash -",
      "sudo yum install -y nodejs gcc-c++ make",
      "sudo npm i -g yarn",
    ]
  }

  lifecycle {
    ignore_changes        = [ami]
    create_before_destroy = true
  }

  tags = merge(var.tags, {
    Name = "prototype-kit"
  })
}

data "archive_file" "codebase" {
  output_path = "${path.module}/bundle.zip"
  type        = "zip"
  source_dir  = "${path.module}/codebase"
  excludes    = ["node_modules"]
}

resource "null_resource" "deploy" {
  triggers = {
    codebase_updated = data.archive_file.codebase.output_base64sha256
  }

  depends_on = [aws_eip_association.eip_assoc]

  connection {
    host        = aws_eip.ip.public_ip
    type        = "ssh"
    user        = "ec2-user"
    private_key = var.private_ssh
  }

  provisioner "file" {
    source      = data.archive_file.codebase.output_path
    destination = "/home/ec2-user/bundle.zip"
  }

  provisioner "file" {
    content = templatefile("${path.module}/prototype.service", {
      password = var.web_password
    })
    destination = "/home/ec2-user/prototype.service"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "rm -rf /home/ec2-user/app",
      "mkdir /home/ec2-user/app",
      "cd /home/ec2-user/app && unzip ../bundle.zip",
      "cd /home/ec2-user/app && yarn install",
      "sudo mv /home/ec2-user/prototype.service /etc/systemd/system/prototype.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl start prototype.service"
    ]
  }
}

resource "aws_vpc" "prototype" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags                 = var.tags
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.prototype_server.id
  allocation_id = aws_eip.ip.id
}

resource "aws_eip" "ip" {
  vpc        = true
  depends_on = [aws_internet_gateway.prototype]
  tags = merge(var.tags, {
    Name = "prototype-kit"
  })
}

resource "aws_subnet" "prototype" {
  cidr_block = cidrsubnet(aws_vpc.prototype.cidr_block, 3, 1)
  vpc_id     = aws_vpc.prototype.id

  tags = var.tags
}

resource "aws_internet_gateway" "prototype" {
  vpc_id = aws_vpc.prototype.id
  tags   = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route_table" "prototype" {
  vpc_id = aws_vpc.prototype.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.prototype.id
  }

  tags = var.tags
}

resource "aws_route_table_association" "prototype" {
  subnet_id      = aws_subnet.prototype.id
  route_table_id = aws_route_table.prototype.id
}

resource "aws_security_group" "security_group" {
  name        = "public-sg"
  description = "MHCLG Data Collection Public"
  vpc_id      = aws_vpc.prototype.id
  tags        = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

locals {
  sg_rules = {
    inbound_SSH = {
      protocol    = "TCP"
      from_port   = 22
      to_port     = 22
      type        = "ingress"
      cidr_blocks = ["0.0.0.0/0"]
    }
    inbound_WEB = {
      protocol    = "TCP"
      from_port   = 80
      to_port     = 80
      type        = "ingress"
      cidr_blocks = ["0.0.0.0/0"]
    }
    outbound_ALL = {
      protocol    = "-1"
      from_port   = 0
      to_port     = 0
      type        = "egress"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}

resource "aws_security_group_rule" "security_group_rules" {
  for_each          = local.sg_rules
  description       = each.key
  protocol          = each.value.protocol
  from_port         = each.value.from_port
  to_port           = each.value.to_port
  type              = each.value.type
  cidr_blocks       = each.value.cidr_blocks
  security_group_id = aws_security_group.security_group.id
}

output "prototype_public_url" {
  value = "http://${aws_eip.ip.public_dns}"
}
