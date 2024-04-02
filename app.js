import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { glob } from 'glob';


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

    sharp(originalImgPath)
        .jpeg({
            quality: 80,
            progressive: true,
            mozjpeg: true,
        })
        .toFile(compressedJpgImgPath)
        .then(() => console.log(compressedJpgImgPath))
        .catch(err => console.error('Error:', compressedJpgImgPath, err));

    sharp(originalImgPath)
        .webp({ quality: 70 })
        .toFile(compressedWebpImgPath)
        .then(() => console.log(compressedWebpImgPath))
        .catch(err => console.error('Error:', compressedWebpImgPath, err));
}
