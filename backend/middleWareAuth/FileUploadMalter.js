const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.originalname.replace(ext, '') + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if ((file.mimetype = "image/jpeg" || file.mimetype == "image/png")) {
        callback(null, true);
    } else {
      console.log("only jpeg and png images are allowed!");
      callback(null,false)
    }
  },
  limits:{
    fileSize:1024*1024*2
  }
});

module.exports =upload
