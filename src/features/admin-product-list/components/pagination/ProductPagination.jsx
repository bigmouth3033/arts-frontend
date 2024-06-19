import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
  transition: all 0.5s;

  & button {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 25%;
  }

  & .arrow {
    height: 1rem;
  }

  & .active {
    border: 2px solid rgba(0, 0, 255, 0.6);
  }

  & span {
    font-size: 17px;
  }
`;

const Button = styled.button`
  cursor: pointer;
`;

export default function ProductPagination({ currentPage, totalPage, setCurrentPage }) {
  const [pages, setPages] = useState([]);
  const [renderPage, setRenderPage] = useState();

  // useEffect(() => {
  //   const array = new Array(totalPage).fill(false);
  //   array[currentPage - 1] = true;
  //   setPages(array);
  // }, [totalPage]);

  const paginate = () => {
    const paginate = [];

    if (currentPage - 2 > 0) {
      paginate.push(currentPage - 2);
    }

    if (currentPage - 1 > 0) {
      paginate.push(currentPage - 1);
    }

    paginate.push(currentPage);

    if (currentPage + 1 <= totalPage) {
      paginate.push(currentPage + 1);
    }

    if (currentPage + 2 <= totalPage) {
      paginate.push(currentPage + 2);
    }

    return paginate;
  };

  useEffect(() => {
    setRenderPage(paginate());
  }, [currentPage]);

  useEffect(() => {
    setRenderPage(paginate());
  }, [totalPage]);

  return (
    <Container>
      <button onClick={() => setCurrentPage(1)} disabled={currentPage == 1}>
        <MdKeyboardDoubleArrowLeft />
      </button>
      {renderPage?.map((item, index) => {
        return (
          <Button onClick={() => setCurrentPage(index + 1)} key={index}>
            {index + 1}
          </Button>
        );
      })}
      <button onClick={() => setCurrentPage(totalPage)} disabled={currentPage == totalPage}>
        <MdKeyboardDoubleArrowRight />
      </button>
    </Container>
  );
}
