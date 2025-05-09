import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UPLOAD_DIR } from '../config/config.js';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function(req, file, cb) {
    cb(null, 'input-' + Date.now() + path.extname(file.originalname));
  }
});

// Create the multer middleware
const upload = multer({ storage: storage });

export default upload;