import React from "react";

import productList from "@/features/listing-page/data/product.json";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import { formatCreatedAt } from "@/shared/utils/DateTimeHandle";

const StyleProductListing = styled.div`
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  /* box-sizing: border-box; */

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const ProductListing = ({ result }) => {
  
  return (
    <StyleProductListing>
      {/* {productList.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))} */}

      {result}
    </StyleProductListing>
  );
};

export default ProductListing;
