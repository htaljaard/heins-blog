import React, { useState } from 'react';
import './SearchAndFilter.css';

const SearchAndFilter = ({ searchTerm, setSearchTerm }) => {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-and-filter">
            <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchAndFilter;
