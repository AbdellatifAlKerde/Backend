import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      `${file.originalname.split(".")[0]}.${file.mimetype.split("/")[1]}`
    );
  },
});

const upload = multer({ storage: storage });

export function uploadImage(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    req.image = req.file.path;
    next();
  });
}

// export function updateImage(req, res, next) {
//   upload.single("image")(req, res, (err) => {
//     if (err) {
//       return next(err);
//     }
//     fs.rename()
//   })
// }

// export function updateImage(req, res, next) {

// }

const image = {
  uploadImage,
};

export default image;
