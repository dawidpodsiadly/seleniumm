import React from 'react';

function SearchBar({id, searchTerm, setSearchTerm, style}) {
  return (
    <input
      type="text"
      id={id}
      placeholder="Search by name or email..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="form-control mt-3"
      style={style}
    />
  );
}

export default SearchBar;
