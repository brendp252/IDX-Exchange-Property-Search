export default function parsePhotos(photos) {
    if (photos.length === 0) return [];
    try {
        const parsedPhotos = JSON.parse(photos || "[]");
        return parsedPhotos;
    }
    catch (error) {
        return [];
    }
}