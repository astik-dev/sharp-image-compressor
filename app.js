import path from 'path';
import fs from 'fs';
import { glob } from 'glob';

import compressImage from './lib/compressImage.js';


const originalsFolder = "./images/originals/";
const compressedFolder = "./images/compressed/";


function changeFileExtension (filePath, newExtension) {
    const filePathWithoutExtension = filePath.slice(0, -path.extname(filePath).length);
    return filePathWithoutExtension + "." + newExtension;
}


const originalImgs = await glob('./**/*.{jpg,jpeg,png}', {cwd: originalsFolder});

if (originalImgs.length > 0) {
    fs.mkdirSync(compressedFolder, { recursive: true });
} else {
    console.log('No images found in', originalsFolder);
}

for (const originalImg of originalImgs) {

    const compressedImgPath = path.join(compressedFolder, originalImg);
    const originalImgPath = path.join(originalsFolder, originalImg);

    const compressedJpgImgPath = changeFileExtension(compressedImgPath, 'jpg');
    const compressedWebpImgPath = changeFileExtension(compressedImgPath, 'webp');

    fs.mkdirSync(path.dirname(compressedImgPath), { recursive: true });

    compressImage(originalImgPath, compressedJpgImgPath, "jpeg");
    compressImage(originalImgPath, compressedWebpImgPath, "webp");
}
