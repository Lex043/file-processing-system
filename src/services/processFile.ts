import fs from "fs";
import archiver from "archiver";
import { pool } from "../db/db";
import path from "path";

export async function compressFile(fileId: string) {
    const result = await pool.query("SELECT filepath FROM files where id = $1", [fileId]);
    const filePath = result.rows[0].filepath;
    const zipPath = filePath + ".zip";
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.file(filePath, { name: path.basename(filePath) });

    await archive.finalize();

    return zipPath;
}
