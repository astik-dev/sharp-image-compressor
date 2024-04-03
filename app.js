import path from 'path';
import { glob } from 'glob';

import compressImage from './lib/compressImage.js';


const originalsFolder = "./images/originals/";
const compressedFolder = "./images/compressed/";


const originalImgs = await glob('./**/*.{jpg,jpeg,png}', {cwd: originalsFolder});

for (const originalImg of originalImgs) {
    
    const inputPath = path.join(originalsFolder, originalImg);
    const outputPath = path.join(compressedFolder, originalImg);

    compressImage(inputPath, outputPath, "jpeg");
    compressImage(inputPath, outputPath, "webp");
}
