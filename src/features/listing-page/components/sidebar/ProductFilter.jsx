import React from "react";
import styled from "styled-components";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

//CSS
const StyleProductFilter = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  border-right: 2px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 3;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
  @media (max-width: 768px) {
  }
`;

//Filter Sidebar (parents component) in Product Listing Page
const ProductFilter = ({
  handleChange,
  handlePriceRadioChange,
  categoryData,
  selectedCategory,
  priceMin,
  priceMax,
}) => {
  return (
    <StyleProductFilter>
      <CategoryFilter
        selectedCategory={selectedCategory}
        handleChange={handleChange}
        categoryData={categoryData}
      />
      <PriceFilter
        priceMin={priceMin}
        priceMax={priceMax}
        handlePriceRadioChange={handlePriceRadioChange}
      />
    </StyleProductFilter>
  );
};

export default ProductFilter;
