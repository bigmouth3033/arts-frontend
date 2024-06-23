import React, { useState } from "react";
import styled from "styled-components";
import PopUp from "@/shared/components/PopUp/PopUp";
import XButton from "@/shared/components/Button/XButton";
import ProductRating from "@/features/rating-comment/Index";
import { FaStar } from "react-icons/fa";

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
            <ReadStar></ReadStar>
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
const Star = styled.span`
  color: ${({ active }) => (active ? "yellow" : "grey")};
  cursor: pointer;
  margin: 0 auto;
`;

const StarContainer = styled.div`
  display: inline-flex;
  font-size: 24px;
`;

function ReadStar() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <StarContainer>
        {[...Array(5)].map(() => (
          <Star key={1} active={4} onClick={() => setRating(index + 1)}>
            <FaStar />
          </Star>
        ))}
      </StarContainer>
    </div>
  );
}
