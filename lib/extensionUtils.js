import path from 'path';

export function changeFileExtension (filePath, newExtension) {
    const filePathWithoutExtension = filePath.slice(0, -path.extname(filePath).length);
    return filePathWithoutExtension + "." + newExtension;
}

export function globExtensions (extensionsArray) {
    const extensionsString = extensionsArray.join(",");
    return extensionsArray.length > 1
        ? "{" + extensionsString + "}"
        : extensionsString;
}
