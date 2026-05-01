# File Compression API

A simple REST API for uploading files, compressing them into .zip format asynchronously using a background job queue, and retrieving the compressed results.

## Features

-   Upload files
-   Automatically compress uploaded files into ZIP format
-   Background processing with BullMQ + Redis
-   PostgreSQL database integration
-   Track compression job status
-   Retrieve compressed file results

## Tech Track

-   Node.js
-   Express.js
-   TypeScript
-   PostgreSQL
-   Redis
-   BullMQ
-   Archiver

---

## Installation

```bash
git clone https://github.com/Lex043/file-processing-system
cd file-processing-system
npm install
```

---

## Environment Variables

create a .env file in the root directory

-   DB_HOST=
-   DB_PORT=
-   DB_USER=
-   DB_PASSWORD=
-   DB_NAME=
-   PORT=

---

## Run the Project

### Start API Server

npm run env

### Start Worker

npm run Worker

## API Endpoint

### Upload File

POST /upload
Uploads a file and adds it to the compression queue.

---

### Get the result status

GET /jobs/:id

## Get the result

GET /jobs/:id/result
Returns compression status and ZIP file path when completed.

---
