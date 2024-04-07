# <img src="https://cdn.jsdelivr.net/gh/lovell/sharp@main/docs/image/sharp-logo.svg" width="24" height="24" alt="sharp logo"> sharp-image-compressor
**sharp-image-compressor** is a Node.js application designed to efficiently compress images using the [Sharp](https://sharp.pixelplumbing.com/) library. This application provides a simple yet powerful way to compress various image formats including JPEG, PNG, WebP, AVIF, and TIFF. With **sharp-image-compressor**, you can quickly reduce the file size of your images without sacrificing quality.

## Features
- Supports multiple input and output formats: JPEG, PNG, WebP, AVIF, and TIFF.
- Recognizes already compressed images, avoiding re-compression.
- Configurable compression settings for each supported format.
- Simple configuration via the `config.js` file.

## Installation
To get started with Sharp Image Compressor, follow these steps:
1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/astik-dev/sharp-image-compressor.git
    ```
2. Navigate to the project directory:

    ```bash
    cd sharp-image-compressor
    ```
3. Install dependencies using npm:

    ```bash
    npm install
    ```

## Configuration
**sharp-image-compressor** behavior can be customized using the `config.js` file. Here's how you can tailor the configuration to suit your needs:
```javascript
// Folder containing original images
export const originalsFolder = "./images/originals/";
// Folder for compressed images
export const compressedFolder = "./images/compressed/";

// Extensions of original images that will be compressed
export const extensionsToCompression = ["jpg", "jpeg", "png"];
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
    tiff: {
        quality: 80,
    },
    webp: {
        quality: 70,
    },
    avif: {
        quality: 70,
    }
}
```
Adjust the paths, extensions, formats, and compression options according to your requirements.

## Usage
Once configured, you can start compressing images using the following command:

```bash
npm start
```

## Requirements
- Node.js
- npm (Node Package Manager)

## Resources

- [Sharp Documentation](https://sharp.pixelplumbing.com/api-output): Refer to Sharp's official documentation for detailed information on compression options and API usage.