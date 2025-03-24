import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distFolder = path.resolve(__dirname, 'dist');
const outerFolder = path.resolve(__dirname, '../dist');
const debugFolder = path.resolve(__dirname, '../bin/Debug/dist');
const releaseFolder = path.resolve(__dirname, '../bin/Release/dist');

async function copyAndClean(src, dest) {
  try {
    if (await fs.existsSync(dest)) {
      await fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copied dist to ${dest}`);
  } catch (err) {
    console.error(`Error copying to ${dest}:`, err);
  }
}

(async () => {
  await copyAndClean(distFolder, outerFolder);
  await copyAndClean(distFolder, debugFolder);
  if (await fs.existsSync(releaseFolder)) {
    await copyAndClean(distFolder, releaseFolder);
  }
})();
