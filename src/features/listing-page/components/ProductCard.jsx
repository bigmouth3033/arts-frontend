import React from "react";
import image from "@/features/listing-page/assets/image.png";
import styled from "styled-components";

const StyleProductCard = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100%;
  border: 0.01rem solid #cee1fcb3;
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

    &.original-price {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: #ba1818;
    }

    &.sale-price {
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
  const minVariant = product.variants.reduce((min, variant) => {
    return variant.price < min.price ? variant : min;
  }, product.variants[0]);
  return (
    <StyleProductCard key={index}>
      <img
        src={
          import.meta.env.VITE_API_IMAGE_PATH +
          product.productImages[0].imageName
        }
      />

      <p>{product.name}</p>
      {minVariant.salePrice != 0 ? (
        <p className="sale-price">{minVariant.salePrice}</p>
      ) : (
        <></>
      )}
      <p className="original-price">{minVariant.price}</p>
    </StyleProductCard>
  );
};

export default ProductCard;
