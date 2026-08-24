import { useState } from 'react';
import './PropertyFilters.css';

const DEFAULT_FILTERS = {
    city: "",
    zipcode: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
};

export default function PropertyFilters({ onSearch, onClear }) {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    
    function handleChange(e) {
        const { name, value } = e.target;

        setFilters(previousFilters => ({
            ...previousFilters,
            [name]: value,
        }));
    }

    function handleSearch(e) {
        e.preventDefault();
        const strippedFilters = Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value !== "")
        );
        onSearch(strippedFilters);
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
                className='property-filters__input' 
                value={filters.city}
                onChange={handleChange}
                placeholder="City"
            />

            <input 
                type="text" 
                name="zipcode"
                className='property-filters__input' 
                value={filters.zipcode}
                onChange={handleChange}
                placeholder="ZIP Code"
            />

            <input
                type="text"
                name="minPrice"
                className='property-filters__input' 
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min. Price"
            />

            <input
                type="text"
                name="maxPrice"
                className='property-filters__input' 
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max. Price"
            />

            <select 
                name="beds"
                className='property-filters__select' 
                value={filters.beds}
                onChange={handleChange}
            >
                <option value="">Beds</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <select 
                name="baths"
                className='property-filters__select' 
                value={filters.baths}
                onChange={handleChange}
            >
                <option value="">Baths</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <button 
                type="submit" 
                className='property-filters__button'
            >
                Search
            </button>
            <button 
                type="button"
                className='property-filters__button' 
                onClick={handleClear}
            >
                Clear Filters
            </button>
        </form>
    );
}