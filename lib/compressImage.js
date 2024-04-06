import path from 'path';
import sharp from "sharp";
import chalk from 'chalk';

import {originalsFolder, compressionOptions} from '../config.js';


function compressImage (inputPath, outputPath, format) {
    
    const relativeInputPath = inputPath.replace(path.normalize(originalsFolder), "");
    const upperCaseFormat = format.toUpperCase();

    return sharp(inputPath)
        [format](compressionOptions[format])
        .toFile(outputPath)
        .then(() => {
            console.log(`Image ${chalk.green(relativeInputPath)} compressed to ${chalk.magenta(upperCaseFormat)} format`);
        });
}


export default compressImage;
