import parsePhotos from '../utils/parsePhotos';
import './PropertyImageCarousel.css';

export default function PropertyImageCarousel({ property, currentPhotoIndex, onPhotoChange }) {
    const photos = parsePhotos(property.L_Photos);

    function handlePreviousPhoto(e) {
        e.preventDefault();
        e.stopPropagation();
        onPhotoChange(currentPhotoIndex - 1);
    }

    function handleNextPhoto(e) {
        e.preventDefault();
        e.stopPropagation();
        onPhotoChange(currentPhotoIndex + 1);
    }

    return (
        <div className='carousel'>
            {photos.length > 0 ? (
                <img
                    className='carousel__photo'
                    src={photos[currentPhotoIndex]}
                    alt={property.L_Address || "Property"}
                />
            ) : (
                <div className='carousel__nophoto'>
                    * No photos available *
                </div>
            )}
            <div className='carousel__controls'>
                {currentPhotoIndex !== 0 && 
                    <button
                        type="button"
                        className='carousel__button'
                        onClick={handlePreviousPhoto}
                    >
                        &lt;
                    </button>
                }
                {currentPhotoIndex < photos.length - 1 && 
                    <button
                        type="button"
                        className='carousel__button'
                        onClick={handleNextPhoto}
                    >
                        &gt;
                    </button>
                }
                {photos.length > 0 &&
                    <div className='carousel__counter'>
                        ({currentPhotoIndex + 1} / {photos.length})
                    </div>
                }
            </div>
        </div>
    );
}