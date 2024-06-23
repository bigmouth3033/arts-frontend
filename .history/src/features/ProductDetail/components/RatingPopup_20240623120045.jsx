import React from "react";

export default function RatingPopup() {
  return (
    <StyledPopupRating action={() => {}}>
      <div>
        <StyledXButton action={() => setIsPopUpVisible(false)} />
      </div>
      <ProductRating />
    </StyledPopupRating>
  );
}
function 