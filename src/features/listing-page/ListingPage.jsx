import React, { useState } from "react";
import ProductFilter from "./components/sidebar/ProductFilter";
import ProductListing from "./components/ProductListing";
import styled from "styled-components";
import Search from "./components/Search";
// import products from "./data/product.json";
import ProductCard from "./components/ProductCard";
import Sort from "./components/Sort";
import { ReadCategoryRequest } from "@/shared/api/categoryApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { ReadCustomerProductsRequest } from "./api/productApi";
import productList from "@/features/listing-page/data/product.json";

const StyleListingPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin: 0 auto;
  max-width: 1230px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;

  & * {
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 3fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;

    > *:first-child {
      display: none;
    }
  }
`;

const StyleRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState();
  const pageSize = 2;

  //call APIs
  const readCategories = ReadCategoryRequest();
  const products = ReadCustomerProductsRequest(
    selectedCategory,
    pageSize,
    sort?.value,
    searchValue
  ); //category ID, pageSize

  //------------Radio Cate Filter---------------
  const handleChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  //------------Radio Price Filter---------------
  const handlePriceRadioChange = (PriceValue) => {
    setSelectedPrice(PriceValue);
  };

  //------------SEARCH---------------------------
  const handleSearchChange = (searchValue) => {
    setSearchValue(searchValue);
    console.log(searchValue);
  };
  if (readCategories.isLoading || products.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <>
      <Search
        searchValueSaved={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <StyleListingPage>
        <ProductFilter
          selectedCategory={selectedCategory}
          selectedPrice={selectedPrice}
          handleChange={handleChange}
          handlePriceRadioChange={handlePriceRadioChange}
          categoryData={readCategories.data.data}
        />
        <StyleRight>
          <Sort switched={sort} setSwitched={setSort} />
          <ProductListing productList={products} pageSize={pageSize} />
        </StyleRight>
      </StyleListingPage>
    </>
  );
};

export default ListingPage;
