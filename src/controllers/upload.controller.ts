import { Request, Response } from "express";
import { pool } from "../db";
import { File } from "../interface/db";
import { fileQueue } from "../utils/queue";

export const uploadController = {
    getFiles: async (_req: Request, res: Response) => {
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
            const result = await pool.query<File>("INSERT INTO files (filename, status) VALUES ($1, 'uploaded') RETURNING *", [filename]);
            const file = result.rows[0];
            await fileQueue.add("process-file", { fileId: file.id });
            await pool.query<File>(`UPDATE files SET status = 'pending' WHERE id = $1`, [file.id]);
            res.status(201).json(file);
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
