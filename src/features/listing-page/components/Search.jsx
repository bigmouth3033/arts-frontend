import React, { useState } from "react";
import styled from "styled-components";

const StyleSearchInput = styled.input`
  width: 20rem;
`;
//value paramater: which kind of value is going to be specifying inside this search component
//name: not product name !!!
const Search = ({ handleSearchChange, searchValueSaved }) => {
  const [searchValue, setSearchValue] = useState(searchValueSaved); //For CSS + 'checked' attribute purpose

  //for saving data in search bar
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchChange(searchValue);
    }
  };

  return (
    <div>
      <StyleSearchInput
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="search here..."
      />
    </div>
  );
};

export default Search;
