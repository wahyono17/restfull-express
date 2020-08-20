const multer = require('multer');

//const upload = multer({dest: 'uploads/'});//kode lama langsung upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const original = file.originalname; //original name yg di upload
      const ext = original.substr(original.length - 5);//ambil 5 string terakhir pasti itu sudah termasuk extension
      const regex = /[^\w\s]/g;//temukan selain word/kata atau whitepsace
      const dot = ext.search(regex);
      cb(null, uniqueSuffix + ext.substr(dot));//ambil setelah . sebagai extension
    }
  });

  const fileFilter = (req, file, cb) => {
    // jika jpg dan png maka di terima, selain itu riject
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  exports.upload_image = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
  });