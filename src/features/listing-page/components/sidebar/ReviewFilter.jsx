import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

//CSS
const StyleCategoryBlock = styled.div`
  border-top: 1px solid lightgray;
  padding-top: 1.7rem;
  & h2 {
    font-size: 1.2rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  font-size: small;
`;

const StyleCategoryTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; // thêm dòng này mới chạy align-items
`;

const StyleStarBlock = styled.div`
  display: block;
  width: 5rem;
  height: 1.5rem;
  text-align: center;
  cursor: pointer;
  border: 1.5px solid lavender;
  border-radius: 5rem;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #ffd3f8;
  `}

  :hover {
    background-color: #f7d9ff;
    border-radius: 5rem;
  }
`;
const ReviewFilter = ({ starValue, handleStarChange }) => {
  const [ratingStar, setRatingStar] = useState(starValue);

  const handleRatingChange = (value) => {
    setRatingStar(value);
    handleStarChange(value);
  };
  return (
    <StyleCategoryBlock>
      <h2>Rating</h2>
      <>
        <StyleStarBlock
          onClick={() => handleRatingChange(1)}
          isActive={ratingStar === 1}
        >
          <div name="rating" value={1} />
          <StyleCategoryTitle>
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </StyleCategoryTitle>
        </StyleStarBlock>
        <StyleStarBlock
          onClick={() => handleRatingChange(2)}
          isActive={ratingStar === 2}
        >
          <div name="rating" value={2} />
          <StyleCategoryTitle>
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </StyleCategoryTitle>
        </StyleStarBlock>
        <StyleStarBlock
          onClick={() => handleRatingChange(3)}
          isActive={ratingStar === 3}
        >
          <div name="rating" value={3} />
          <StyleCategoryTitle>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
          </StyleCategoryTitle>
        </StyleStarBlock>
        <StyleStarBlock
          onClick={() => handleRatingChange(4)}
          isActive={ratingStar === 4}
        >
          <div name="rating" value={4} />
          <StyleCategoryTitle>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </StyleCategoryTitle>
        </StyleStarBlock>
        <StyleStarBlock
          onClick={() => handleRatingChange(5)}
          isActive={ratingStar === 5}
        >
          <div name="rating" value={5} />
          <StyleCategoryTitle>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </StyleCategoryTitle>
        </StyleStarBlock>
      </>
    </StyleCategoryBlock>
  );
};

export default ReviewFilter;
