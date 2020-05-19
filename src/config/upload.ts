import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename(_req, file, callback) {
      callback(null, file.originalname);
    },
  }),
});
