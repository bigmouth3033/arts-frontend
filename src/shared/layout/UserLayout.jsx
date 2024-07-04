import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import UserNavbar from "@/features/User/header/Index";
import Footer from "@/features/User/footer/Index";
import { ReadCategoryRequest } from "../api/categoryApi";
import { ReadTypeRequest } from "../api/typeApi";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

const Container = styled.div`
  font-size: 14px;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  background-color: rgb(245, 245, 250);
`;

const OutletContainer = styled.div``;

export default function UserLayout() {
  const readCategoryRequest = ReadCategoryRequest();
  const readTypeRequest = ReadTypeRequest();

  if (readCategoryRequest.isSuccess) {
    localStorage.setItem("categories", JSON.stringify(readCategoryRequest.data.data));
  }

  if (readTypeRequest.isSuccess) {
    localStorage.setItem("types", JSON.stringify(readTypeRequest.data.data));
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Open Sans"],
      },
    });
  }, []);

  return (
    <Container>
      <UserNavbar />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <BackToTopButton />
      <Footer />
    </Container>
  );
}

const TopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;

  color: white;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  z-index: 1000;

  & svg {
    font-size: 2.3rem;
    color: #0057a0;
  }
`;

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <TopButton onClick={scrollToTop}>
          <FaRegArrowAltCircleUp />
        </TopButton>
      )}
    </div>
  );
}
