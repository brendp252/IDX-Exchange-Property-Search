import { Link } from 'react-router';
import './PropertyCard.css';

export function parseFirstPhoto(photos) {
    if (photos.length === 0) return "";
    try {
        const parsedPhotos = JSON.parse(photos || "[]");
        return parsedPhotos[0];
    }
    catch (error) {
        return "";
    }
}

export default function PropertyCard({ property }) {
    const id = property.L_ListingID;
    const photo = parseFirstPhoto(property.L_Photos);
    const price = property.L_SystemPrice.toLocaleString('en-US');
    const address = property.L_Address;
    const city = property.L_City;
    const state = property.L_State;
    const beds = property.L_Keyword2;
    const baths = property.LM_Dec_3;
    const sqft = property.LM_Int2_3;

    return (
        <Link
            to={`http://localhost:3000/property/${id}`}
            className='property-card__link'
        >
            <div className='property-card'>
                <div className='property-card__visual'>
                    {photo !== "" ? (
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
                    <ul className='property-card__features'>
                        <li>
                            <div className='property-card__beds'>{beds} beds</div>
                        </li>
                        <li>
                            <div className='property-card__baths'>{baths} baths</div>
                        </li>
                        <li>
                            <div className='property-card__sqft'>{sqft} sqft</div>
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    );
}