import React, { useState } from "react";
import styled from "styled-components";

const StyleSearchInput = styled.input`
  width: 20rem;
`;
//value paramater: which kind of value is going to be specifying inside this search component
//name: not product name !!!
const Search = ({ handleSearchChange }) => {
  const [searchValue, setSearchValue] = useState(""); //For CSS + 'checked' attribute purpose

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
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
