import { pool } from "../db";

async function createSchema() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS files (
                id SERIAL PRIMARY KEY,
                filename VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
                )
            `);
        console.log("Schema created successfully.");
    } catch (error) {
        console.error("Error creating schema:", error);
    } finally {
        await pool.end();
    }
}

createSchema();
