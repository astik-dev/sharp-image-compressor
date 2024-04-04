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


function compressImage (inputPath, outputPath, format) {
    sharp(inputPath)
        [format](options[format])
        .toFile(outputPath)
        .then(() => console.log(outputPath))
        .catch(err => console.error('Error:', outputPath, err));
}


export default compressImage;
