import './PropertyCard.css'

function parseFirstPhoto(photos) {
    try {
        const parsedPhotos = JSON.parse(photos || "[]");
        return parsedPhotos.length > 0 ? parsedPhotos[0] : "";
    }
    catch (error) {
        return "";
    }
}

function PropertyCard({ property }) {
    const photo = parseFirstPhoto(property.L_Photos);
    const price = property.L_SystemPrice;
    const address = property.L_Address;
    const city = property.L_City;
    const state = property.L_State;
    const beds = property.L_Keyword2;
    const baths = property.LM_Dec_3;
    const sqft = property.LM_Int2_3;

    return (
        <div className='property-card'>
            <img
                className='property-card__photo'
                src={photo}
                alt={address}
            />
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