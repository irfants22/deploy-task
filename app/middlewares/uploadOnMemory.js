const multer = require("multer"); // require multer

// // Mendefinisikan gimana cara nyimpen file-nya
// const storage = multer.memoryStorage();

// // Membuat upload middleware
// module.exports = multer({ storage });

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('picture');

// Create new method/middleware to run "upload"
exports.uploadToMemory = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).json({
                status: 'FAIL',
                message: `Failed to upload:${err.message}`
            });
            return;
        }
        next();
    })
}

