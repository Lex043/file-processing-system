import { Router } from "express";
import { uploadController } from "../controllers/upload.controller";
import { upload } from "../config/multer";

export const uploadRoutes = Router();

uploadRoutes.get("/", uploadController.getFiles);
uploadRoutes.post("/", upload.single("file"), uploadController.uploadFile);
uploadRoutes.delete("/:id", uploadController.deleteFile);
