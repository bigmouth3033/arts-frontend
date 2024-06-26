import styled from "styled-components";
import { useState } from "react";
import { GetAdminOrderRequest } from "./api/adminOrdersApi";

const Container = styled.div`
  margin: auto;
  max-width: 75rem;
  font-size: 14px;
  min-height: 40rem;
  padding: 3rem 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  > h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  > button {
    cursor: pointer;
    background-color: #2962ff;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    border: none;
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
  }

  > button:hover {
    background-color: #0052cc;
  }
`;

const Content = styled.div`
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Footer = styled.div`
  padding: 2rem 2rem;
`;

const TableContent = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  width: 100%;

  overflow: hidden;

  thead tr {
    background-color: #0091ea;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & td > button {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    cursor: pointer;
  }
`;

const FilterBar = styled.div`
  padding: 2rem;
`;

const OrderStatusButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;

  border-bottom: ${(props) => (props.$active == true ? "10px solid red" : "none")};
`;

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid black;
`;

export default function AdminOrder() {
  const getAdminOrdersetAdminOrderRequest = GetAdminOrderRequest(1, 10);

  return (
    <Container>
      <Header></Header>
      <Content>
        <FilterBar>
          <Buttons>
            <OrderStatusButton $actve={true}>All</OrderStatusButton>
            <OrderStatusButton>Pending</OrderStatusButton>
            <OrderStatusButton>Accepted</OrderStatusButton>
            <OrderStatusButton>Denied</OrderStatusButton>
            <OrderStatusButton>Delivery</OrderStatusButton>
            <OrderStatusButton>Success</OrderStatusButton>
          </Buttons>
        </FilterBar>
        <TableContent>
          <thead>
            <tr>
              <th>NAME</th>
              <th>AVAILABLE</th>
              <th>ON STOCK</th>
              <th>ACTIVE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
        </TableContent>
      </Content>
      <Footer></Footer>
    </Container>
  );
}
