import React from "react";

export default function RatingPopup() {
  return (
    <div>
      <StyledPopupRating action={() => {}}>
        <div>
          <StyledXButton action={() => setIsPopUpVisible(false)} />
        </div>
        <ProductRating />
      </StyledPopupRating>
    </div>
  );
}
