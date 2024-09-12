const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = '../backend/uploads/profilePictures';
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    const email = req.body.email ? req.body.email.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'unknown_user';
    const ext = path.extname(file.originalname);
    cb(null, `${email}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, 
});

module.exports = upload;
