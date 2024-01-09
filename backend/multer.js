 import multer from "multer";
 const storage = multer.diskStorage(
    {
        destination: './uploads',
        filename: function (req, file, cb) {

            console.log("file");
            console.log(file);
            const parts = file.originalname.split(".");
            const ext = parts[parts.length - 1];
            const name = parts[0];
            cb(null, `${name}-${Date.now()}.${ext}`)          

        }
    }
);

export const uploadMiddleware = multer({ storage: storage });