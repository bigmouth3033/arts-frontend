import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import AdminHeader from "@/features/admin/admin-header/Index";
import AdminSideBar from "@/features/admin/admin-sidebar/Index";
import { ReadCategoryRequest } from "../api/categoryApi";
import { ReadTypeRequest } from "../api/typeApi";
import { AdminRequest } from "../api/adminApi";
import WaitingPopUp from "../components/PopUp/WaitingPopUp";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const OutletContainer = styled.div`
  height: calc(100vh - 3.8rem);
  overflow-y: scroll;
  background-color: #f3f4f6;

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

const AdminBody = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
`;

export default function AdminLayout() {
  const adminRequest = AdminRequest();
  const readCategoryRequest = ReadCategoryRequest();
  const readTypeRequest = ReadTypeRequest();

  const navigate = useNavigate();

  if (readCategoryRequest.isSuccess && localStorage.getItem("categories") == null) {
    localStorage.setItem("categories", JSON.stringify(readCategoryRequest.data.data));
  }

  if (readTypeRequest.isSuccess && localStorage.getItem("types") == null) {
    localStorage.setItem("types", JSON.stringify(readTypeRequest.data.data));
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

  if (adminRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (adminRequest.isError) {
    navigate("/admin-login");
    return;
  }

  if (adminRequest.isSuccess) {
    if (adminRequest.data.status == 400) {
      navigate("/admin-login");
    } else {
      return (
        <Container>
          <AdminHeader />
          <AdminBody>
            <AdminSideBar />
            <OutletContainer>
              <Outlet />
            </OutletContainer>
          </AdminBody>
        </Container>
      );
    }
  }
}
