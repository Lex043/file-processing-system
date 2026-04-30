import multer from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req: Request, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        const nameWithoutExt = path.parse(file.originalname).name.replace(/\s+/g, "-"); // optional cleanup

        const ext = path.extname(file.originalname);

        cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`);
    },
});

export const upload = multer({ storage });
