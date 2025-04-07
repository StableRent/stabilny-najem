import fs from 'fs/promises';
import path from 'path';
import { inlineScriptHashes } from '../src/generated/sriHashes.mjs';

const headersPath = path.join(process.cwd(), 'dist', '_headers');

async function generateCSPHeader() {
  try {
    // Check if the file exists first
    try {
      await fs.access(headersPath);
    } catch {
      console.error(`_headers file not found at ${headersPath}`);
      return;
    }

    // Combine all script hashes
    const scriptHashes = new Set([...inlineScriptHashes]);

    // Generate CSP header without inline and external script hashes
    const cspHeader =
      'Content-Security-Policy: ' +
      [
        "default-src 'self'",
        "object-src 'self'",
        `script-src 'self' ${Array.from(scriptHashes)
          .map(hash => `'${hash}'`)
          .join(' ')}`,
        "connect-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "base-uri 'self'",
        "img-src 'self' https://ik.imagekit.io/truedaniyyel/ data:",
        "media-src 'self' https://ik.imagekit.io/truedaniyyel/",
        "font-src 'self' data: https://fonts.gstatic.com",
        "frame-src 'self' https://www.google.com/",
        "frame-ancestors 'none'",
        "worker-src 'self'",
        "manifest-src 'none'",
        "form-action 'self'",
      ].join('; ');

    // Read existing _headers file
    let headersContent = await fs.readFile(headersPath, 'utf-8');

    // Add the new CSP header
    headersContent += '\n  ' + cspHeader;

    // Write updated content back to _headers file
    await fs.writeFile(headersPath, headersContent);

    console.log('CSP header generated and _headers file updated successfully.');
  } catch (error) {
    console.error('Error generating CSP header:', error);
  }
}

generateCSPHeader();
