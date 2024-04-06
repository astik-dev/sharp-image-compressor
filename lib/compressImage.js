import path from 'path';
import sharp from "sharp";
import chalk from 'chalk';

import {originalsFolder} from '../config.js';


const options = {
    jpeg: {
        quality: 80,
        progressive: true,
        mozjpeg: true,
    },
    png: {
        quality: 80,
    },
    webp: {
        quality: 70,
    },
    avif: {
        quality: 70,
    }
}


function compressImage (inputPath, outputPath, format) {
    
    const relativeInputPath = inputPath.replace(path.normalize(originalsFolder), "");
    const upperCaseFormat = format.toUpperCase();

    return sharp(inputPath)
        [format](options[format])
        .toFile(outputPath)
        .then(() => {
            console.log(`Image ${chalk.green(relativeInputPath)} compressed to ${chalk.magenta(upperCaseFormat)} format`);
        });
}


export default compressImage;
