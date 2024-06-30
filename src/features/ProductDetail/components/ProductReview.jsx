import React, { useState } from "react";
import styled from "styled-components";

import { FaStar } from "react-icons/fa";
import RatingPopup from "./RatingPopup";
import { SlLike } from "react-icons/sl";
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
const StyledButtonRating = styled.button`
  margin-top: 1rem;
  border: none;
  border-radius: 3px;
  background-color: #f5f5fa;
  cursor: pointer;
  transition: transform 1s ease-in-out; /* Added transition */
  :hover {
    transform: scale(1.5);
  }
`;

const StyledratingIconLike = styled(SlLike)`
  font-size: 30px;
  color: #4b91f7;
`;
export default function ProductReview({ data }) {
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
          <StyledButtonRating onClick={handleClickRating}>
            <StyledratingIconLike />
          </StyledButtonRating>
          {showRating && <RatingPopup action={() => setShowRating(false)} data={data} />}
        </div>
        <div>Read comment by all customer (5 comment )</div>
      </StyledContainer>
    </div>
  );
}

const Star = styled.span`
  color: ${({ active }) => (active ? "#FFC400" : "grey")};
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
  align-items: first baseline;
`;
const StyledWrapReadStar = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;
function ReadStar() {
  const rows = 5;

  return (
    <Wrapper>
      {[...Array(rows)].map((_, rowIndex) => (
        <StyledWrapReadStar>
          <StarContainer key={rowIndex}>
            {[...Array(5)].map((_, starIndex) => (
              <Star key={starIndex} active={starIndex < rows - rowIndex}>
                <FaStar />
              </Star>
            ))}
          </StarContainer>
          <p>(30 rating)</p>
        </StyledWrapReadStar>
      ))}
    </Wrapper>
  );
}
