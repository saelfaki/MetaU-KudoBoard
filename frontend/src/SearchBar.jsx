import React from 'react';
import {useState} from 'react';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm]= useState('');

    function handleChange(e) {
        setSearchTerm(e.target.value);
        if (searchTerm>0) {
            props.search(searchTerm)
        } else{
            props.fetchDisplayBoard()
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
