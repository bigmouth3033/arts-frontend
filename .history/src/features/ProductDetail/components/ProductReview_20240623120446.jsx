import React, { useState } from "react";
import styled from "styled-components";
import PopUp from "@/shared/components/PopUp/PopUp";
import XButton from "@/shared/components/Button/XButton";
import ProductRating from "@/features/rating-comment/Index";
import { FaStar } from "react-icons/fa";
import RatingPopup from "./RatingPopup";

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
            <ReadStar />
          </div>
          <button onClick={handleClickRating}>Rating</button>
          {showRating && (
           <RatingPopup action={() => setIsPopUpVisible(false)/>
          }
        </div>
        <div>Read comment by all customer (5 comment )</div>
      </StyledContainer>
    </div>
  );
}

const Star = styled.span`
  color: ${({ active }) => (active ? "#FFC400" : "grey")};
  cursor: pointer;
  margin: 0 auto;
`;

const StarContainer = styled.div`
  display: inline-flex;
  font-size: 24px;
  margin-bottom: 5px; /* Thêm khoảng cách giữa các hàng */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ReadStar() {
  const rows = 5;

  return (
    <Wrapper>
      {[...Array(rows)].map((_, rowIndex) => (
        <StarContainer key={rowIndex}>
          {[...Array(5)].map((_, starIndex) => (
            <Star key={starIndex} active={starIndex < rows - rowIndex}>
              <FaStar />
            </Star>
          ))}
        </StarContainer>
      ))}
    </Wrapper>
  );
}
