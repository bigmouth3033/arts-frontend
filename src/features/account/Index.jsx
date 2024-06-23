import React from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AccountDetailSideBar from "./components/AccountDetailSideBar";
import { CustomerRequest } from "@/shared/api/customerApi";
import { useNavigate } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";

const Container = styled.div`
  max-width: 1230px;
  padding: 15px;
  margin: 0 auto;
`;

const BreadCrumb = styled.div`
  padding: 10px 10px;
  display: flex;
  align-items: center;

  > span {
    color: rgba(0, 0, 0, 0.5);
  }

  > svg {
    margin-right: 5px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 1rem;
  margin: 1rem 0;
`;

const OutletContainter = styled.div``;

export default function Account() {
  const customerRequest = CustomerRequest();

  const navigate = useNavigate();

  if (customerRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (customerRequest.isError) {
    navigate("/");
    return;
  }

  return (
    <Container>
      <BreadCrumb>
        <Link>Home</Link> <FaAngleRight />
        <Link>Account</Link>
      </BreadCrumb>
      <Content>
        <AccountDetailSideBar data={customerRequest.data.data} />
        <OutletContainter>
          <Outlet />
        </OutletContainter>
      </Content>
    </Container>
  );
}
