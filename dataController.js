const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// Configure Multer
const upload = multer({ dest: 'uploads/' });

// File upload handler
exports.uploadFile = (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded!' });

    const results = [];
    fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            fs.unlinkSync(file.path); // Clean up the file
            res.status(200).json({ message: 'File processed successfully', data: results });
        });
};
