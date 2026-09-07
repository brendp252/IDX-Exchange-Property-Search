import parsePhotos from '../utils/parsePhotos';
import './PropertyImageGallery.css';

export default function PropertyImageGallery({ 
    property, 
    currentPhotoIndex, 
    onPhotoClick, 
    isLightboxOpen 
}) {
    const photos = parsePhotos(property.L_Photos);
    const lightboxStyle = {
        height: '1000px',
        margin: 'auto'
    };

    return (
        <div className='gallery'>
            {photos.length > 0 ? (
                <div>
                    <img
                        className='gallery__main-image'
                        src={photos[currentPhotoIndex]}
                        alt={property.L_Address || "Property"}
                    />
                    <div className='gallery__thumbnail-strip'>
                        {photos.map((photo, index) => (
                            <img
                                className='gallery__small-image'
                                key={index}
                                src={photo}
                                alt={property.L_Address || "Property"}
                                onClick={() => onPhotoClick(index)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>No photos available</p>
            )}
        </div>
    );
}