const express = require('express');
const dataController = require('../controller/dataController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.single('file'), dataController.uploadFile);

module.exports = router;
