import { useEffect, useState } from 'react';
import { fetchProperties } from '../api/client';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import './ListingsPage.css';

function ListingsPage() {
    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState({});
    const [propertyLimit] = useState(20);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProperties() {
            try {
                const data = await fetchProperties({
                    ...filters,
                    limit: propertyLimit,
                });
                setProperties(data.results || []);
                setTotal(data.total || 0); 
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        loadProperties();
    }, [propertyLimit, filters]);

    async function handleSearch(filters) {
        try {
            setError("");
            setIsLoading(true);
            setFilters(filters);
            const data = await fetchProperties({
                ...filters,
                limit: propertyLimit,
            });
            setProperties(data.results || []);
            setTotal(data.total || 0); 
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    async function handleClear() {
        try {
            setError("");
            setIsLoading(true);
            setFilters({});
            const data = await fetchProperties({
                limit: propertyLimit,
            });
            setProperties(data.results || []);
            setTotal(data.total || 0);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='listings-page'>
            <PropertyFilters 
                onSearch={handleSearch} 
                onClear={handleClear} 
            />
            <div className='listings-page__count'>
                {total > 0 ? (
                    <div>
                        Showing {Math.min(propertyLimit, total)} of {total} properties
                    </div>
                ) : (
                    <div>
                        No properties found! Try a different search.
                    </div>
                )}
            </div>
            <div className='listings-page__results'>
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
