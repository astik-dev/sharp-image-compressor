import fs from 'fs';
import path from 'path';
import sharp from "sharp";


const options = {
    jpeg: {
        quality: 80,
        progressive: true,
        mozjpeg: true,
    },
    webp: {
        quality: 70,
    },
}


function changeFileExtension (filePath, newExtension) {
    const filePathWithoutExtension = filePath.slice(0, -path.extname(filePath).length);
    return filePathWithoutExtension + "." + newExtension;
}


function compressImage (inputPath, outputPath, format) {

    outputPath = changeFileExtension(outputPath, format);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    sharp(inputPath)
        [format](options[format])
        .toFile(outputPath)
        .then(() => console.log(outputPath))
        .catch(err => console.error('Error:', outputPath, err));
}


export default compressImage;
