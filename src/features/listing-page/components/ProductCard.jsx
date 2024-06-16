import React from "react";
import image from "@/features/listing-page/assets/image.png";
import styled from "styled-components";

const StyleProductCard = styled.div`
  display: block;
  width: 100%;
  height: max-content;
  /* border: 0.01rem solid lightgray; */
  border-radius: 0.7rem;

  & p {
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-left: 0.7rem;
    margin-bottom: 1rem;

    @media (max-width: 784px) {
      font-size: 0.75rem;
    }

    &.sale-price {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: #ba1818;
    }

    &.original-price {
      color: grey;
      font-weight: 600;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      text-decoration: line-through;
    }
  }

  & img {
    display: block;
    margin: 1rem auto;
    width: 85%;
    height: 13rem;
    border-radius: 9px;
    object-fit: cover;
  }

  @media (max-width: 784px) {
    width: 100%;
  }

  @media (max-width: 430px) {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 0 15px 0 #abc7f9;
  }
`;

//Product Card items in Product Listing Page
const ProductCard = ({ product, index }) => {
  return (
    <StyleProductCard key={index}>
      <img src={image} />

      <p>{product.Name}</p>
      <p className="original-price">{product.Price}</p>
      <p className="sale-price">{product.SalePrice}</p>
    </StyleProductCard>
  );
};

export default ProductCard;
