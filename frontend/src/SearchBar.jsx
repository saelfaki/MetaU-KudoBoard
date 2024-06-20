import React from 'react';
import {useState} from 'react';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm]= useState('');

    function handleChange(e) {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            props.emptySearchBar(e.target.value);
        }
    }
        return (
        <div>
            <input type="text" onChange={handleChange}  placeholder='Search' />
            <button onClick={() => props.search(searchTerm)}> Search</button>
        </div>
    )
}

export default SearchBar;
