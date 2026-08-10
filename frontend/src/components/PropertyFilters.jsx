import { useState } from 'react';
import './PropertyFilters.css'

const DEFAULT_FILTERS = {
    city: "",
    zipcode: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
};

function PropertyFilters({ onSearch, onClear }) {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    
    function handleChange(event) {
        const { name, value } = event.target;

        setFilters((previousFilters) => ({
            ...previousFilters,
            [name]: value,
        }));
    }

    function handleSearch(event) {
        event.preventDefault();
        onSearch(filters);
    }

    function handleClear() {
        setFilters(DEFAULT_FILTERS);
        onClear();
    }

    return (
        <form className='property-filters' onSubmit={handleSearch}>
            <input 
                type="text" 
                name="city" 
                value={filters.city}
                onChange={handleChange}
                placeholder="City"
            />

            <input 
                type="text" 
                name="zipcode"
                value={filters.zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
            />

            <input
                type="text"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min. Price"
            />

            <input
                type="text"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max. Price"
            />

            <select 
                name="beds"
                value={filters.beds}
                onChange={handleChange}
            >
                <option value="">--Beds--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <select 
                name="baths"
                value={filters.baths}
                onChange={handleChange}
            >
                <option value="">--Baths--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <button type="submit">Search</button>
            <button type="button" onClick={handleClear}>
                Clear Filters
            </button>
        </form>
    );
}

export default PropertyFilters;