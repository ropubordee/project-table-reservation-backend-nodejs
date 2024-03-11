const multer = require("multer");

const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});




const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'images') {
      cb(null, true);
    } else {
      cb(new Error('Unexpected field'));
    }
  },
});


module.exports = upload;