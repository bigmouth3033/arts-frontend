import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import UserNavbar from "@/features/User/header/Index";
import Footer from "@/features/User/footer/Index";
import { CustomerRequest } from "../api/customerApi";

const Container = styled.div`
  font-size: 14px;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const OutletContainer = styled.div``;

export default function UserLayout() {
  const customerRequest = CustomerRequest();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
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
    </Container>
  );
}
