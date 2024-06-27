import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import UserNavbar from "@/features/User/header/Index";
import Footer from "@/features/User/footer/Index";
import { ReadCategoryRequest } from "../api/categoryApi";
import { ReadTypeRequest } from "../api/typeApi";
import CustomerChatBox from "@/features/CustomerChatBox/Index";

const Container = styled.div`
  font-size: 14px;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  background-color: rgb(245, 245, 250);
`;

const CustomerChatBoxStyled = styled(CustomerChatBox)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-10px, -10px);
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
      <Footer />
      <CustomerChatBoxStyled />
    </Container>
  );
}
