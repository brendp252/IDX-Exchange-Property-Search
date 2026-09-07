import { useState } from 'react';
import { Link } from 'react-router';
import PropertyImageCarousel from './PropertyImageCarousel';
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
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const id = property.L_ListingID;
    const price = property.L_SystemPrice.toLocaleString('en-US');
    const address = property.L_Address;
    const city = property.L_City;
    const state = property.L_State;
    const beds = property.L_Keyword2;
    const baths = property.LM_Dec_3;
    const sqft = property.LM_Int2_3.toLocaleString('en-US');

    function handlePhotoChange(photoIndex) {
        setCurrentPhotoIndex(photoIndex);
    }

    return (
        <Link
            to={`http://localhost:3000/property/${id}`}
            className='property-card__link'
        >
            <div className='property-card'>
                <PropertyImageCarousel 
                    property={property}
                    currentPhotoIndex={currentPhotoIndex}
                    onPhotoChange={handlePhotoChange}
                />
                <div className='property-card__info'>
                    <div className='property-card__price'>${price}</div>
                    <div className='property-card__address'>{address}</div>
                    <div className='property-card__city-state'>{city}, {state}</div>
                    <ul className='property-card__features'>
                        <li>{beds} bds</li>
                        <li>{baths} ba</li>
                        <li>{sqft} sqft</li>
                    </ul>
                </div>
            </div>
        </Link>
    );
}