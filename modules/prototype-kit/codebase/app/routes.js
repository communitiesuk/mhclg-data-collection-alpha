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

    req.session.data.columns = parsedTabularDocument.data.columns
    console.log(req.session.data)

    res.render(req.query.template || "task-list-3")
  },
)

router.post(
  '/save-mapping',
  async (req, res) => {
    const mapFrom = req.session.data.mapFrom
    const mapTo = req.session.data.mapTo
    const currentPage = parseInt(req.session.data.currentPage)

    const columnNumber = req.session.data
      .mhclg_data_columns[currentPage].columns
      .findIndex( item => item.name == mapFrom )
    req.session.data
      .mhclg_data_columns[currentPage]
      .columns[columnNumber]
      .mappedTo = mapTo
    console.log(req.session.data)
    console.log(req.session.data.mhclg_data_columns[0].columns)
    res.render(req.query.template || "task-list-3")
  }
)

module.exports = router
