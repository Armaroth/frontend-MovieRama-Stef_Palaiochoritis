import http from 'http';
import fs from 'fs';
import path from 'path';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const server = http.createServer((req, res) => {
    // Base directory is one level up from the `server` folder
    const baseDir = path.resolve(__dirname, '../');
    const filePath = req.url === '/' ? path.join(baseDir, './page/index.html') : path.join(baseDir, req.url || '');
    const extname = path.extname(filePath);

    // Content-Type map for different file types
    const contentTypeMap: Record<string, string> = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
    };

    // Determine the correct Content-Type for the requested file
    const contentType = contentTypeMap[extname] || 'text/plain';

    // Read and serve the requested file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If file is not found, serve the index.html for SPA routing
                fs.readFile(path.join(baseDir, './page/index.html'), (error, indexContent) => {
                    if (error) {
                        res.writeHead(500);
                        res.end('500 - Internal Server Error');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(indexContent, 'utf-8');
                });
            } else {
                // Handle other server errors
                res.writeHead(500);
                res.end(`500 - Internal Server Error: ${err.code}`);
            }
        } else {
            // If file is found, serve it with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
