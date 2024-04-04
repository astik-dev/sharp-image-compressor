import path from 'path';

function changeFileExtension (filePath, newExtension) {
    const filePathWithoutExtension = filePath.slice(0, -path.extname(filePath).length);
    return filePathWithoutExtension + "." + newExtension;
}

export default changeFileExtension;
