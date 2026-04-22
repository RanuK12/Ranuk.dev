const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
};

// Simple file watcher
const watchedFiles = new Set();
let clients = [];

function watchFile(filePath) {
    if (watchedFiles.has(filePath)) return;
    watchedFiles.add(filePath);

    fs.watchFile(filePath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            console.log(`📝 File changed: ${filePath}`);
            notifyClients();
        }
    });
}

function notifyClients() {
    clients.forEach(client => {
        if (!client.res.finished) {
            client.res.write('data: update\n\n');
        }
    });
}

const server = http.createServer((req, res) => {
    // SSE endpoint for hot reload
    if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        clients.push({ req, res });
        req.on('close', () => {
            clients = clients.filter(c => c !== { req, res });
        });
        return;
    }

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code, 'utf-8');
            }
        } else {
            // Watch the file for changes
            watchFile(filePath);

            // Add cache control headers for development
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Advanced hot reload server running at http://localhost:${PORT}/`);
    console.log('📁 Watching all files for changes');
    console.log('🔄 Browser will auto-refresh on file changes');
    console.log('Press Ctrl+C to stop');
});