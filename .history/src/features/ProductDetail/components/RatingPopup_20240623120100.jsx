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
function RatingStar(){
  <StyledContainer>
      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            active={index < rating}
            hover={index < hoverStar}
            onClick={() => handleStarClick(index)}
            onMouseMove={() => handleStarHover(index)}
            onMouseLeave={handleStarLeave}
          >
            <FaStar />
          </Star>
        ))}
      </StarContainer>
      <div>
        {show && (
          <div>
            <StyledGroupVote>
              <StyledPreview
                type="text"
                placeholder="What is your problem?"
                onKeyDownCapture={handleKeyPress}
                value={rating}
              />
              <StyledButtonVote>Vote</StyledButtonVote>
            </StyledGroupVote>
          </div>
        )}
      </div>
    </StyledContainer>
  );
}