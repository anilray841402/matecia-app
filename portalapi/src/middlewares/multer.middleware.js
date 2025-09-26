import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/materialAdda/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .png, and .pdf formats are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
