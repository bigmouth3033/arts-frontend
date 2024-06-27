import React from "react";
import styled from "styled-components";
const StyledContainerProductRelated = styled.div``;
const StyledProductTitle = styled.div`
  color: #4c503d;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 20px;
  padding: 15px 10px 0 0;
`;

const StyledContainerProductList = styled.div`
  padding: 0 5%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  gap: 20px;
`;

export default function ProductRelated() {
  return (
    <StyledContainerProductRelated>
      {/* <StyledProductTitle>RELATED PRODUCT</StyledProductTitle> */}
      <StyledContainerProductList>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </StyledContainerProductList>
    </StyledContainerProductRelated>
  );
}

const StyledProductBox = styled.div`
  border-radius: 10px;
  padding: 15px;
`;

const StyledProductImage = styled.img`
  display: block;
  border-radius: 10px;
  object-fit: cover;
  height: 180px;
  width: 100%;
`;
const StyledNameProduct = styled.div`
  font-size: 15px;
  line-height: 1.4;
  font-family: SVN-Gilroy Bold, Verdana, Roboto, Tahoma, sans-serif;
  max-height: 3em; /* Chiều cao tối đa tương đương 2 dòng */
  overflow: hidden;
  text-overflow: ellipsis; /* Hiển thị dấu chấm (...) nếu văn bản bị cắt bớt */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Số dòng hiển thị tối đa */
  -webkit-box-orient: vertical;
  margin: 0.4rem 0;
`;
const StyledContainerPrice = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  columns: 0.2rem;
  align-items: center;
`;
const StyledProductPrice = styled.div`
  color: red;
  font-size: 15px;
`;
const StyledProductPriceOrigin = styled.div`
  color: gray;
  font-size: 12px;
  text-decoration: line-through;
`;
const StyledContainerStar = styled.div`
  display: flex;
  padding: 2px 0;
  justify-content: baseline;
  align-items: center;
`;
const StyledGoldStar = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  background-color: gold;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );

  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  ::before {
    top: -5px;
    left: calc(50% - 5px);
    border-width: 0 5px 8px 5px;
    border-color: transparent transparent gold transparent;
  }

  ::after {
    bottom: -5px;
    left: calc(50% - 5px);
    border-width: 8px 5px 0 5px;
    border-color: gold transparent transparent transparent;
  }
`;

const StyledReviews = styled.div`
  font-size: 12px;
  color: gray;
  margin: 0.5rem 0 0 0;
`;
function Product() {
  return (
    <StyledProductBox>
      <div>
        <StyledProductImage
          src="src/features/ProductDetail/data/images/e.jpg"
          alt=""
        />
      </div>
      <div>
        <StyledNameProduct>
          Smooth avocado shampoo recovers recovers recovers
        </StyledNameProduct>
        <StyledContainerPrice>
          <StyledProductPrice>25.00 USD</StyledProductPrice>
          <StyledProductPriceOrigin>30.00</StyledProductPriceOrigin>
        </StyledContainerPrice>
        <StyledContainerStar>
          <StyledGoldStar />
          <StyledGoldStar />
          <StyledGoldStar />
          <StyledGoldStar />
          <StyledGoldStar />
        </StyledContainerStar>
        <StyledReviews>5.0/281 reviews</StyledReviews>
      </div>
    </StyledProductBox>
  );
}
