import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = Date.now() + path.extname(file.originalname);
    cb(null, ext);
  },
});

// const storage = multer.memoryStorage()

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf"
    ) {
      callback(null, true);
    } else {
      console.log("File Not Supported");
      callback(null, false);
    }
  },
  limits: {
     fileSize: 1024 * 1024 * 5
  },
});


export default upload