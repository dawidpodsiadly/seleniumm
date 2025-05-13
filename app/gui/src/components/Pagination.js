import React from 'react';
import '../css/Pagination.css';

const Pagination = ({
  id,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  setItemsPerPage,
  itemsPerPage,
  totalItems,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onNextPage();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPrevPage();
    }
  };

  const handleItemsPerPageChange = e => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    sessionStorage.setItem('itemsPerPage', value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div id={id} className="pagination">
      <button id={`${id}-prev-button`} onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button id={`${id}-next-button`} onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      <div>
        Items per page:{' '}
        <select id={`${id}-page-items`} value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div>
        Displaying items {startIndex + 1} - {endIndex} of {totalItems || 0}
      </div>
    </div>
  );
};

export default Pagination;
