import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max velikost 5 MB
    fileFilter: (req, file, cb) => {
        //  pouze PNG a JPG
        if (!["image/png", "image/jpeg"].includes(file.mimetype)) {
            return cb(new Error("Only PNG and JPG files are allowed!"), false);
        }
        cb(null, true);
    }
});

export const uploadImages = upload.array("images", 1); // Max 1 obrázek
