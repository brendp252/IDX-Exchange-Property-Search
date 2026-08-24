import { useEffect, useState } from 'react';
import { fetchProperties } from '../api/client';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import Pagination from '../components/Pagination';
import './ListingsPage.css';

export default function ListingsPage() {
    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const itemsPerPage = 20;

    useEffect(() => {
        async function loadProperties() {
            try {
                setError("");
                setIsLoading(true);
                const data = await fetchProperties({
                    ...filters,
                    limit: itemsPerPage,
                    offset: itemsPerPage * (currentPage - 1)
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
    }, [currentPage, itemsPerPage, filters]);

    async function handleSearch(filters) {
        try {
            setError("");
            setIsLoading(true);
            setFilters(filters);
            setCurrentPage(1);
            const data = await fetchProperties({
                ...filters,
                limit: itemsPerPage,
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
            setCurrentPage(1);
            const data = await fetchProperties({
                limit: itemsPerPage,
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

    function handlePageChange(page) {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }

    const totalPages = Math.ceil(total / itemsPerPage);
    const startIndex = total === 0 ? 0 : (itemsPerPage * (currentPage - 1)) + 1;
    const endIndex = Math.min(itemsPerPage * currentPage, total);

    return (
        <div className='listings-page'>
            <PropertyFilters 
                onSearch={handleSearch} 
                onClear={handleClear} 
            />
            <div className='listings-page__count'>
                {total > 0 ? (
                    <div>
                        Showing {startIndex}-{endIndex} of {total} properties
                    </div>
                ) : (
                    <div>
                        No properties found! Try a different search.
                    </div>
                )}
            </div>
            <div className='listings-page__results'>
                {properties.map(property =>
                    <PropertyCard
                        property={property}
                        key={property.L_ListingID}
                    />
                )}
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}