import path from 'path';
import { promises as fs } from 'fs';
import { glob } from 'glob';

import removeIntermediatePaths from './lib/removeIntermediatePaths.js';
import changeFileExtension from './lib/changeFileExtension.js';
import compressImage from './lib/compressImage.js';


const startTime = performance.now();


const originalsFolder = "./images/originals/";
const compressedFolder = "./images/compressed/";
const compressionToFormats = ["jpeg", "webp"];


const originalImgs = await glob('./**/*.{jpg,jpeg,png}', {cwd: originalsFolder});
const compressedImgs = new Set(
    await glob(`${compressedFolder}**/*.{${compressionToFormats.join(",")}}`)
);


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
const compressionPromises = [];
for (const originalImg of originalImgs) {
    
    const inputPath = path.join(originalsFolder, originalImg);
    const outputPath = path.join(compressedFolder, originalImg);

    compressionToFormats.forEach(format => {
        const outputPathWithNewFormat = changeFileExtension(outputPath, format);
        if (compressedImgs.has(outputPathWithNewFormat)) return;
        compressionPromises.push(
            compressImage(inputPath, outputPathWithNewFormat, format)
        );
    });
}
await Promise.all(compressionPromises);


// Log the number of compressed images and the time taken for compression
const numberOfCompressedImages = compressionPromises.length;
const imageWord = compressionPromises.length == 1 ? "image" : "images";
const executionTime = ((performance.now() - startTime) / 1000).toFixed(1);
console.log(`\n${numberOfCompressedImages} compressed ${imageWord} created in ${executionTime} seconds.`);
