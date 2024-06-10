import styled from "styled-components";
import { useRef, useEffect } from "react";
import ButtonGroup from "./components/ButtonGroup";
import { MdOutlineDashboard } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 3.8rem);
  background-color: #edeff2;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const Content = styled.div`
  min-height: calc(100vh - 3.8rem);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledLink = styled(Link)`
  background-color: ${(props) => (props.$active ? "white" : "#edeff2")};
  border-radius: 5px;
  padding: 5px 35px;
  text-decoration: none;
  color: black;
  font-size: 13px;
  &:hover {
    background-color: ${(props) => (props.$active ? "None" : "#eaebed")};
  }

  box-shadow: ${(props) =>
    props.$active
      ? "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;"
      : "None"};
`;

export default function AdminSideBar() {
  const containerRef = useRef();
  const contentRef = useRef();

  const location = useLocation();

  useEffect(() => {
    const overflow = containerRef.current.clientHeight - contentRef.current.clientHeight;

    if (overflow != 0) {
      containerRef.current.style.overflowY = "scroll";
    } else {
      containerRef.current.style.overflowY = "hidden";
    }
  });

  return (
    <Container ref={containerRef}>
      <Content ref={contentRef}>
        <ButtonGroup
          link={"dashboard"}
          groupName={"Dashboard"}
          icon={<MdOutlineDashboard />}
        ></ButtonGroup>
        <ButtonGroup groupName={"Products"} icon={<CiShoppingTag />} active={true}>
          <StyledLink $active={location.pathname.includes("product-list")} to={"product-list"}>
            All Products
          </StyledLink>
          <StyledLink>Category</StyledLink>
          <StyledLink>Inventory</StyledLink>
        </ButtonGroup>
      </Content>
    </Container>
  );
}
