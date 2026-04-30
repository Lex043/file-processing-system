import { Request, Response } from "express";
import { pool } from "../db/db";
import { File } from "../interface/db";

export const jobController = {
    getJobStatus: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query<File>("SELECT id, status FROM files WHERE id = $1", [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Job not found" });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: "Error fetching job status" });
        }
    },

    //retrieve process file

    getJobResult: async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await pool.query<File>("SELECT id, archive_path FROM files WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const file = result.rows[0];
        if (file.status !== "completed") {
            return res.status(200).json({
                status: file.status,
                message: "File is still processing",
            });
        }
        res.status(200).json({
            archivePath: file.archive_path,
        });
        try {
        } catch (error) {
            console.error("job result error", error);
            res.status(500).json({ message: "Error fetching job result" });
        }
    },
};
