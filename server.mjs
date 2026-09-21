import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 5173);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const requested = decoded === '/' ? '/index.html' : decoded;
  const absolute = normalize(join(root, requested));
  const insideRoot = relative(root, absolute);
  if (insideRoot.startsWith('..') || insideRoot.includes(':')) return null;
  return absolute;
}

export const server = createServer(async (request, response) => {
  try {
    const path = safePath(request.url || '/');
    if (!path || !(await stat(path)).isFile()) throw new Error('not-found');
    const body = await readFile(path);
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(path).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Archivo no encontrado');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\nTaskUp Mongo práctica está funcionando en:\nhttp://localhost:${port}\n`);
  console.log('Presiona Ctrl + C para detener el servidor.');
});
