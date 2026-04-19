import { Request, Response } from "express";
import { pool } from "../db";
import { File } from "../types";

export const uploadController = {
    getFiles: async (req: Request, res: Response) => {
        try {
            const result = await pool.query<File>("SELECT * FROM files ORDER BY ID ASC");
            if (result.rows.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: "Error fetching files." });
        }
    },
    uploadFile: async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded." });
            }
            const { filename } = req.file;
            const result = await pool.query<File>("INSERT INTO files (filename) VALUES ($1) RETURNING *", [filename]);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: "Error uploading file." });
        }
    },
    deleteFile: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query("DELETE FROM files WHERE id = $1", [id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "File not found." });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting file." });
        }
    },
};
