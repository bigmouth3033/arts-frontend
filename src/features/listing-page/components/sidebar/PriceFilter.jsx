import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ProductFilter from "./ProductFilter";

const StylePriceBlock = styled.div`
  & h2 {
    font-weight: normal;
  }
  font-size: small;
`;

const StylePriceTitle = styled.div`
  display: inline-block;
`;
const StylePriceContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin: 0.2rem;
`;

const StyleInputRadio = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.2s ease-in-out;
  }

  &:checked {
    border-color: lightpink;

    &:before {
      background-color: #c781fd;
    }
  }
`;

// Price Filter Block in Sidebar of Product Listing Page
const PriceFilter = ({ handlePriceRadioChange }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);

  //handle which price range is selected
  const handlePriceChange = (priceValue) => {
    setSelectedPrice(parseInt(priceValue));
    handlePriceRadioChange(parseInt(priceValue)); // Call the handleChange prop with the selected price value
  };

  return (
    <StylePriceBlock>
      <h2>Price</h2>
      <StylePriceContent>
        <StyleInputRadio
          type="radio"
          name="price"
          value={0}
          checked={selectedPrice === 0}
          onChange={(event) => handlePriceChange(event.target.value)}
        />
        <StylePriceTitle>All</StylePriceTitle>
      </StylePriceContent>
      <StylePriceContent>
        <StyleInputRadio
          type="radio"
          name="price"
          value={50}
          checked={selectedPrice === 50}
          onChange={(event) => handlePriceChange(event.target.value)}
        />
        <StylePriceTitle>0 - $50</StylePriceTitle>
      </StylePriceContent>
      <StylePriceContent>
        <StyleInputRadio
          type="radio"
          name="price"
          value={100}
          checked={selectedPrice === 100}
          onChange={(event) => handlePriceChange(event.target.value)}
        />
        <StylePriceTitle>$50 - $100</StylePriceTitle>
      </StylePriceContent>
      <StylePriceContent>
        <StyleInputRadio
          type="radio"
          name="price"
          value={200}
          checked={selectedPrice === 200}
          onChange={(event) => handlePriceChange(event.target.value)}
        />
        <StylePriceTitle>$100 - $200</StylePriceTitle>
      </StylePriceContent>
      <StylePriceContent>
        <StyleInputRadio
          type="radio"
          name="price"
          value={201}
          checked={selectedPrice === 201}
          onChange={(event) => handlePriceChange(event.target.value)}
        />
        <StylePriceTitle>Over $200</StylePriceTitle>
      </StylePriceContent>
    </StylePriceBlock>
  );
};

export default PriceFilter;
