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
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || 0
  );
  const [priceMin, setPriceMin] = useState(
    searchParams.get("minPrice") || null
  );
  const [priceMax, setPriceMax] = useState(
    searchParams.get("maxPrice") || null
  );
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [starValue, setStarValue] = useState(searchParams.get("star") || 0);
  const [sort, setSort] = useState();

  const pageSize = 4;

  //call APIs
  const readCategories = ReadCategoryRequest();
  const products = ReadCustomerProductsRequest(
    selectedCategory,
    pageSize,
    sort?.value,
    searchValue,
    priceMin,
    priceMax,
    starValue
  ); //category ID, pageSize

  //------------Radio Price Filter---------------
  const handlePriceRadioChange = (priceRangeMin, priceRangeMax) => {
    setPriceMin(priceRangeMin);
    setPriceMax(priceRangeMax);
    setSearchParams({
      categoryId: selectedCategory,
      search: searchValue,
      minPrice: priceRangeMin,
      maxPrice: priceRangeMax,
      star: starValue,
    });
  };
  //------------Radio Star Filter---------------
  const handleStarChange = (value) => {
    setStarValue(value);
    console.log(value);
    setSearchParams({
      categoryId: selectedCategory,
      search: searchValue,
      minPrice: priceMin,
      maxPrice: priceMax,
      star: value,
    });
  };
  //------------Radio Cate Filter---------------
  const handleChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams({
      categoryId: categoryId,
      search: searchValue,
      minPrice: priceMin,
      maxPrice: priceMax,
      star: starValue,
    });
  };
  //------------SEARCH---------------------------
  const handleSearchChange = (value) => {
    setSearchParams({
      categoryId: selectedCategory,
      search: value,
      minPrice: priceMin,
      maxPrice: priceMax,
      star: starValue,
    });
    setSearchValue(value);
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
          priceMin={priceMin}
          priceMax={priceMax}
          handleChange={handleChange}
          handlePriceRadioChange={handlePriceRadioChange}
          categoryData={readCategories.data.data}
          starValue={starValue}
          handleStarChange={handleStarChange}
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
