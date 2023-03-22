


//Return a size formatted for when saving to firebase rtdb.
export default function formatSize(size) {
    if(isNaN(size))
        return size;
    const formattedSize = size.replace('.','_');
    return formattedSize;
}