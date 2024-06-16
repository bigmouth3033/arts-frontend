import React, { useState } from "react";
import ProductFilter from "./components/sidebar/ProductFilter";
import ProductListing from "./components/ProductListing";
import styled from "styled-components";
import Search from "./components/Search";
import products from "./data/product.json";
import ProductCard from "./components/ProductCard";
import Sort from "./components/Sort";

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  //------------Search Filter---------------
  const [search, setSearch] = useState("");

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const searchItems = products.filter((product) =>
    product.Name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  //------------Radio Cate Filter---------------
  const handleChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  //------------Radio Price Filter---------------
  const handlePriceRadioChange = (PriceValue) => {
    setSelectedPrice(PriceValue);
  };

  //------------Main Function handle listing page---------------
  function filteredData(products, selectedCate, selectedPrice, search) {
    let filteredProducts = products; //all products

    //Filtering Search Items
    if (search) {
      filteredProducts = searchItems;
    }

    console.log(search);

    //Selected Filter
    //Destructuring => using exactly the name of each field of the table/json file instead of product.Price, product.etc...
    if (selectedCate !== null || selectedPrice !== null) {
      filteredProducts = filteredProducts.filter(
        ({ CategoryID, Price, SalePrice }) => {
          if (selectedCate === 0) {
            // All categories
            if (selectedPrice === 0) {
              // All price range
              return true;
            } else if (selectedPrice <= 50) {
              // 0 - $50 price range
              return (
                (Price >= 0 && Price <= 50) ||
                (SalePrice >= 0 && SalePrice <= 50)
              );
            } else if (selectedPrice <= 100) {
              // $50 - $100 price range
              return (
                (Price > 50 && Price <= 100) ||
                (SalePrice > 50 && SalePrice <= 100)
              );
            } else if (selectedPrice <= 200) {
              // $100 - $200 price range
              return (
                (Price > 100 && Price <= 200) ||
                (SalePrice > 100 && SalePrice <= 200)
              );
            } else {
              // Over $200 price range
              return Price > 200 || SalePrice > 200;
            }
          } else {
            // Specific category
            if (selectedPrice === 0) {
              // All price range
              return CategoryID === selectedCate;
            } else if (selectedPrice <= 50) {
              // 0 - $50 price range
              return (
                CategoryID === selectedCate &&
                ((Price >= 0 && Price <= 50) ||
                  (SalePrice >= 0 && SalePrice <= 50))
              );
            } else if (selectedPrice <= 100) {
              // $50 - $100 price range
              return (
                CategoryID === selectedCate &&
                ((Price > 50 && Price <= 100) ||
                  (SalePrice > 50 && SalePrice <= 100))
              );
            } else if (selectedPrice <= 200) {
              // $100 - $200 price range
              return (
                CategoryID === selectedCate &&
                ((Price > 100 && Price <= 200) ||
                  (SalePrice > 100 && SalePrice <= 200))
              );
            } else {
              // Over $200 price range
              return (
                CategoryID === selectedCate && (Price > 200 || SalePrice > 200)
              );
            }
          }
        }
      );
    }

    console.log(selectedCate, selectedPrice);
    return filteredProducts.map((product, index) => (
      <ProductCard product={product} index={index} />
    ));
  }

  //Call the main function
  const result = filteredData(
    products,
    selectedCategory,
    selectedPrice,
    search
  );

  //Then pass main function to ProductFilter as a props
  return (
    <>
      <Search handleSearchChange={handleSearchChange} />

      <StyleListingPage>
        <ProductFilter
          handleChange={handleChange}
          handlePriceRadioChange={handlePriceRadioChange}
        />
        <StyleRight>
          <Sort />
          <ProductListing result={result} />
        </StyleRight>
      </StyleListingPage>
    </>
  );
};

export default ListingPage;
