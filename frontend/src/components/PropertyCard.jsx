import './PropertyCard.css'

function parseFirstPhoto(photos) {
    if (!photos) return "";
    try {
        const parsedPhotos = JSON.parse(photos);
        return Array.isArray(parsedPhotos) ? parsedPhotos[0] : "";
    }
    catch (error) {
        return "";
    }
}

function PropertyCard({ property }) {
    const photo = parseFirstPhoto(property.L_Photos);
    const price = property.L_SystemPrice.toLocaleString('en-US');
    const address = property.L_Address;
    const city = property.L_City;
    const state = property.L_State;
    const beds = property.L_Keyword2;
    const baths = property.LM_Dec_3;
    const sqft = property.LM_Int2_3;

    return (
        <div className='property-card'>
            <div className='property-card__visual'>
                {photo ? (
                    <img
                        className='property-card__photo'
                        src={photo}
                        alt={address}
                    />
                ) : (
                    <div className='property-card__nophoto'>
                        *Photo unavailable*
                    </div>
                )}
            </div>
            <div className='property-card__info'>
                <div className='property-card__price'>${price}</div>
                <div className='property-card__address'>{address}</div>
                <div className='property-card__city-state'>{city}, {state}</div>
                <div className='property-card__beds'>{beds} beds</div>
                <div className='property-card__baths'>{baths} baths</div>
                <div className='property-card__sqft'>{sqft} sqft</div>
            </div>
        </div>
    );
}

export default PropertyCard;
