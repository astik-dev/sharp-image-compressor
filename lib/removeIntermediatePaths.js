import path from 'path';


function buildPathTree (paths) {
    
    const pathTree = {};

    paths.forEach(directoryPath => {
        
        const pathSegments = directoryPath.split(path.sep);
        
        let current = pathTree;
        
        for (let i = 0; i < pathSegments.length; i++) {
            const pathSegment = pathSegments[i];
            if (!current[pathSegment]) {
                current[pathSegment] = {};
            }
            current = current[pathSegment];
        }
    });

    return pathTree;
}

function pathTreeToStrings (pathTree, parentDir = "") {
    
    let pathStrings = [];
    
    for (let dirName in pathTree) {
        
        const currentDir = parentDir ? path.join(parentDir, dirName) : dirName;

        if (Object.keys(pathTree[dirName]).length > 0) {
            const nestedDirs = pathTreeToStrings(pathTree[dirName], currentDir);
            pathStrings = pathStrings.concat(nestedDirs);
        } else {
            pathStrings.push(currentDir);
        }
    }
    
    return pathStrings;
}


function removeIntermediatePaths (paths) {
    const pathTree = buildPathTree(paths);
    return pathTreeToStrings(pathTree);
}


export default removeIntermediatePaths;
