const axios = require('axios')
const express = require('express')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = express.Router()

// Add your routes here - above the module.exports line
router.post(
  '/upload/tabular-data',
  upload.single('file'),
  async (req, res) => {
    const url = process.env.TABULAR_PARSER_URI
    const {buffer: file, mimetype, originalname: filename} = req.file

    const {data: parsedTabularDocument} = await axios.post(url, {
      file: file.toString('base64'),
      filename,
      mimetype,
    })

    const outputData = req.session.data
    outputData['parsedTabularDocument'] = parsedTabularDocument

    res.render(req.query.template || "task-list-3", outputData)
  },
)

module.exports = router
