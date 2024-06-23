import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

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
const StyledGroupVote = styled.div`
  border: 1px black solid;
  border-radius: 5px;
  max-width: 500px;
  height: 40px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  overflow: hidden;
  margin: 0 auto;
`;

const StyledPreview = styled.input`
  border: none;
  height: 40px;
  border: 1px solid #dddddd;
  padding: 5px;
  &:focus {
    border: none;
  }
`;
const StyledButtonVote = styled.button`
  height: 40px;
  border: none;
  color: white;
  font-size: 14px;
  background-color: rgb(2, 114, 192, 0.5);
  &:hover {
    background-color: rgb(2, 114, 192);
  }
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

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  > button {
    cursor: pointer;
    color: white;
    background-color: #2962ff;
    border: none;
    padding: 0.3rem 1rem;
    border-radius: 5px;

    &:hover {
      background-color: #0052cc;
    }
  }
`;
export default function ProductRating() {
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [show, setShow] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
    setShow(true);
  };

  const handleStarHover = (starIndex) => {
    setHoverStar(starIndex + 1);
  };

  const handleStarLeave = () => {
    setHoverStar(0);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleVote();
    }
  };
  console.log(rating);
  return (
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


const function Star = ()=>{

}