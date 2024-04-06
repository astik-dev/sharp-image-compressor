// Folder containing original images
export const originalsFolder = "./images/originals/";
// Folder for compressed images
export const compressedFolder = "./images/compressed/";
// Formats to which original images will be compressed
export const compressionToFormats = ["jpeg", "webp"];

// Compression options for different formats
// These options can be configured based on Sharp documentation for each format:
// https://sharp.pixelplumbing.com/api-output
export const compressionOptions = {
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
