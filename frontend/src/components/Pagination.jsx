import { useState } from 'react';
import './Pagination.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages === 1) {
        return null;
    }
    
    return (
        <div className='pagination'>
            <button
                type="button"
                className='pagination__button'
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <button
                type="button"
                className='pagination__button'
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}