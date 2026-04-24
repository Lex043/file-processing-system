import { Request, Response } from "express";
import { pool } from "../db";
import { File } from "../interface/db";

export const jobController = {
    getJobStatus: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query<File>(`SELECT id, status FROM files WHERE id = $1`, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Job not found" });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: "Error fetching job status" });
        }
    },
};
