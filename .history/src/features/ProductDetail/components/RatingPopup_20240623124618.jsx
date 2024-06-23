import XButton from "@/shared/components/Button/XButton";
import TextInput from "@/shared/components/Input/TextInput";
import PopUp from "@/shared/components/PopUp/PopUp";
import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StyledPopupRating = styled(PopUp)`
  width: 400px;
  height: 550px;
  padding: 0;
`;
const StyledXButton = styled(XButton)`
  background-color: white;
  transform: translate(50%, -30%);

  &:hover {
    background-color: white;
  }
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledHeader = styled.div`
  display: flex;
  gap: 1rem;
  > div:nth-of-type(2) {
    flex: 1;
  }
`;
const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledImage = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledImages = styled.div``;

export default function RatingPopup({ action, data }) {
  const inputRef = useRef();


  return (
    <StyledPopupRating action={() => {}}>
      <StyledContainer>
        <StyledHeader>
          <StyledImage>
            <img
              src={
                import.meta.env.VITE_API_IMAGE_PATH +
                data.productImages[0].imageName
              }
              alt=""
            />
          </StyledImage>
          <div>
            <h4>{data.name}</h4>
            <RatingStar />
          </div>
          <XButton />
        </StyledHeader>
        <StyledMessage>
          <h4>What makes you satisfied?</h4>
          <TextInput />
        </StyledMessage>
        <StyledImages>
          <input type="file" ref={ } />
        </StyledImages>
      </StyledContainer>
    </StyledPopupRating>
  );
}

const StarContainer = styled.div`
  display: inline-flex;
  font-size: 24px;
`;

const Star = styled.span`
  color: ${({ active, hover }) => (active || hover ? "yellow" : "grey")};
  cursor: pointer;
  margin: 0 auto;
`;

function RatingStar() {
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
  return (
    <div>
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
    </div>
  );
}
