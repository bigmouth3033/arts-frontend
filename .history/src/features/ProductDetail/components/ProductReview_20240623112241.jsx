import React, { useState } from "react";
import styled from "styled-components";
import PopUp from "@/shared/components/PopUp/PopUp";
import XButton from "@/shared/components/Button/XButton";
import ProductRating from "@/features/rating-comment/Index";

const StyledPopupRating = styled(PopUp)`
  width: 400px;
  height: 550px;
`;
const StyledXButton = styled(XButton)`
  background-color: white;
  transform: translate(50%, -30%);

  &:hover {
    background-color: white;
  }
`;
const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
const StyledProductTitle = styled.div`
  color: #4c503d;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 20px;
  padding: 15px 10px 0 0;
`;
export default function ProductReview() {
  const [showRating, setShowRating] = useState(false);
  const handleClickRating = () => {
    setShowRating(true);
  };
  return (
    <div>
      <StyledProductTitle>REVIEW & RATING</StyledProductTitle>
      <StyledContainer>
        <div>
          <div>
            <ProductRating /> <span>455 rating</span>
            <ProductRating />
            134 rating
            <ProductRating />
            24 rating
            <ProductRating />
            23 rating
            <ProductRating />
            45 rating
          </div>
          <button onClick={handleClickRating}>Rating</button>
          {showRating && (
            <StyledPopupRating action={() => {}}>
              <div>
                <StyledXButton action={() => setIsPopUpVisible(false)} />
              </div>
              <ProductRating />
            </StyledPopupRating>
          )}
        </div>
        <div>Read comment by all customer (5 comment )</div>
      </StyledContainer>
    </div>
  );
}

function Star() {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          active={index < rating}
          hover={index < hoverStar}
          onClick={() => handleStarClick(index)}
          onMouseMove={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
        >
          <FaSta />
        </Star>
      ))}
    </div>
  );
}
