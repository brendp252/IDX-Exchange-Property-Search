import { useEffect, useState } from 'react';
import { fetchProperties } from '../api/client';
import PropertyCard from '../components/PropertyCard';
import './ListingsPage.css';

function ListingsPage() {
    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function renderProperties() {
            const data = await fetchProperties();
            setProperties(data.results);
            setTotal(data.total);
        }

        renderProperties();
    }, []);

    return (
        <div className='listings-page'>
            <div className='listings-page__grid'>
                {properties.map((property) => (
                    <PropertyCard
                        key={property.L_ListingID}
                        property={property}
                    />
                ))}
            </div>
        </div>
    );
}

export default ListingsPage;