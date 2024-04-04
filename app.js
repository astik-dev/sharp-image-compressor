import path from 'path';
import { promises as fs } from 'fs';
import { glob } from 'glob';

import removeIntermediatePaths from './lib/removeIntermediatePaths.js';
import compressImage from './lib/compressImage.js';


const originalsFolder = "./images/originals/";
const compressedFolder = "./images/compressed/";


const originalImgs = await glob('./**/*.{jpg,jpeg,png}', {cwd: originalsFolder});


// Create a directory structure in the 'compressedFolder'
// mirroring the structure of original images
const uniqueDirectories = new Set(originalImgs.map(img => path.dirname(img)));
const directoriesToMake = removeIntermediatePaths([...uniqueDirectories]);
await Promise.all(
    directoriesToMake.map(dir =>
        fs.mkdir(path.join(compressedFolder, dir), { recursive: true })
    )
);


// Compress each original image
for (const originalImg of originalImgs) {
    
    const inputPath = path.join(originalsFolder, originalImg);
    const outputPath = path.join(compressedFolder, originalImg);

    compressImage(inputPath, outputPath, "jpeg");
    compressImage(inputPath, outputPath, "webp");
}
