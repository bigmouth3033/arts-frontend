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

function ReadStar() {
  return (
    <div>
      <Star>
        <FaStar />
      </Star>
    </div>
  );
}
