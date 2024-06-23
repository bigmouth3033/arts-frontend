import React from 'react'

export default function ProductReview() {
  return (
    <div><div>
    <button onClick={handleClickRating}>Rating</button>
    {showRating && (
      <StyledPopupRating action={() => {}}>
        <div>
          <StyledXButton action={() => setIsPopUpVisible(false)} />
        </div>
        <ProductRating />
      </StyledPopupRating>
    )}
  </div></div>
  )
}
