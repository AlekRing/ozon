import React from 'react';

const Search = ({handleChange}) => {
    return (
        <input type='text' onChange={handleChange} tabIndex={1} />
    );
};

export default Search;