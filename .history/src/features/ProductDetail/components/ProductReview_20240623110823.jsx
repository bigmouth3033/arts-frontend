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
export default function ProductReview() {
  const [showRating, setShowRating] = useState(false);
  const handleClickRating = () => {
    setShowRating(true);
  };
  return (
    <div>
    <StyledProductTitle>RELATED PRODUCT</StyledProductTitle>
      <div>
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
    </div>
  );
}