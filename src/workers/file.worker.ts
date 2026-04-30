import { Worker } from "bullmq";
import { compressFile } from "../services/processFile";
import IORedis from "ioredis";
import { pool } from "../db/db";

const connection = new IORedis({ maxRetriesPerRequest: null });
console.log("🔥 Worker file started");
new Worker(
    "fileQueue",
    async job => {
        const { fileId } = job.data;
        await pool.query("UPDATE files SET status = 'processing' WHERE id = $1", [fileId]);

        try {
            const archivePath = await compressFile(fileId);

            await pool.query("UPDATE files SET status = 'completed', archive_path = $1 WHERE id = $2", [archivePath, fileId]);
        } catch (error: any) {
            await pool.query("UPDATE files SET status =  'failed', error = $1 WHERE id = $2", [error.message, fileId]);
        }
    },
    { connection },
);
