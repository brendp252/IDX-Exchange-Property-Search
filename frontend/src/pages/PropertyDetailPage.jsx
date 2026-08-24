import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { fetchPropertyDetail, fetchPropertyOpenhouses } from '../api/client';
import { parseFirstPhoto } from '../components/PropertyCard';
import './PropertyDetailPage.css';

export default function PropertyDetailPage() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProperty() {
            try {
                setError("");
                setIsLoading(true);
                const data = await fetchPropertyDetail(id);
                setProperty(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        loadProperty();
    }, [id]);

    if (!property) return <div>Loading...</div>;

    const photo = parseFirstPhoto(property.L_Photos);
    
    return (
        <>
            <h2><Link to="/">Back to Listings</Link></h2>
            <div className='property-detail-page'>
                <div className='property-detail-page__photo'>
                    <img src={photo} alt={property.L_Address}/>
                </div>
                <div className='property-detail-page__info'>
                    <div className='property-detail-page__price'>
                        ${property.L_SystemPrice}
                    </div>
                    <div className='property-detail-page__address'>
                        {property.L_Address}
                    </div>
                    <div className='property-detail-page__beds'>
                        {property.L_Keyword2} beds
                    </div>
                    <div className='property-detail-page__baths'>
                        {property.LM_Dec_3} bathrooms
                    </div>
                    <div className='property-detail-page__sqft'>
                        {property.LM_Int2_3} square feet
                    </div>
                </div>
            </div>
        </>
    );
}