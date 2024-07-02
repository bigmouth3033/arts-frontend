import React from "react";
import image from "@/features/listing-page/assets/image.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyleProductCard = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100%;
  border: 0.01rem solid #cee1fcb3;
  border-radius: 0.7rem;
  text-decoration: none;

  & p {
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-left: 0.7rem;

    @media (max-width: 784px) {
      font-size: 0.75rem;
    }

    &.product-name {
      overflow: hidden;
      text-overflow: ellipsis; /* Hiển thị dấu chấm (...) nếu văn bản bị cắt bớt */
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Số dòng hiển thị tối đa */
      -webkit-box-orient: vertical;
    }

    &.original-price {
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      margin-right: 1rem;
      color: #ba1818;
      position: relative;
    }

    .currency-symbol {
      font-size: 0.7em;
      position: absolute;
      top: -0.3em;
    }

    &.sale-price {
      color: grey;
      font-weight: 600;
      font-size: 1rem;
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

const StylePriceBlock = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
`;

//Product Card items in Product Listing Page
const ProductCard = ({ product, index }) => {
  //hien thi gia nho
  const minVariant = product.variants.reduce((min, variant) => {
    return variant.price < min.price ? variant : min;
  }, product.variants[0]);
  return (
    <StyleProductCard to={`/productdetail?id=${product.id}`} key={index}>
      <img
        src={
          import.meta.env.VITE_API_IMAGE_PATH +
          product.productImages[0].imageName
        }
      />
      <p className="product-name">{product.name}</p>
      <StylePriceBlock>
        {minVariant.salePrice != 0 ? (
          <p className="sale-price">{minVariant.salePrice}</p>
        ) : (
          <></>
        )}
        <p className="original-price">
          {minVariant.price}
          <sup className="currency-symbol">$</sup>
        </p>
      </StylePriceBlock>
    </StyleProductCard>
  );
};

export default ProductCard;
