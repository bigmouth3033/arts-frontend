import PopUp from "@/shared/components/PopUp/PopUp";
import React from "react";
import styled from "styled-components";

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
export default function RatingPopup(action) {
  return (
    <StyledPopupRating action={() => {}}>
      <div>
        <StyledXButton action={action} />
      </div>
      <ProductRating />
    </StyledPopupRating>
  );
}

const StyledContainer = styled.div``;
const StarContainer = styled.div`
  display: inline-flex;
  font-size: 24px;
`;

const Star = styled.span`
  color: ${({ active, hover }) => (active || hover ? "yellow" : "grey")};
  cursor: pointer;
  margin: 0 auto;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  padding: 1rem;
  gap: 0.5rem;
  border: 1px dotted rgba(0, 0, 0, 0.4);
  margin: 1rem 0;

  > p {
    grid-column: 1/4;
  }
`;

const Header = styled.div`
  font-size: 19px;
`;

const ImageContainer = styled.div`
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;

  border: ${(props) =>
    props.$chosen == true
      ? "3px solid #007ACE"
      : "1px solid rgba(0, 0, 255, 0.4)"};
  cursor: pointer;

  & img {
    display: block;
    width: 100% !important;
    height: 100%;
    object-fit: cover;
  }
`;

function RatingStar() {
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
  </StyledContainer>;
}