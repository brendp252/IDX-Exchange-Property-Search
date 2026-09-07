import './Pagination.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className='pagination'>
            {currentPage !== 1 && 
                <button
                    type="button"
                    className='pagination__button'
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    &lt;
                </button>
            }
            {currentPage !== 1 &&
                <button
                    type="button"
                    className='pagination__button'
                    onClick={() => onPageChange(1)}
                >
                    1
                </button>
            }
            {currentPage >= 3 &&
                <span 
                    className='pagination__ellipsis'
                >
                    ...
                </span>
            }
            <button
                type="button"
                className='pagination__current-page-button'
                onClick={() => onPageChange(currentPage)}
            >
                {currentPage}
            </button>
            {currentPage <= totalPages - 2 &&
                <span 
                    className='pagination__ellipsis'
                >
                    ...
                </span>
            }
            {currentPage !== totalPages &&
                <button
                    type="button"
                    className='pagination__button'
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </button>
            }
            {currentPage !== totalPages &&
                <button
                    type="button"
                    className='pagination__button'
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    &gt;
                </button>
            }
        </div>
    );
}