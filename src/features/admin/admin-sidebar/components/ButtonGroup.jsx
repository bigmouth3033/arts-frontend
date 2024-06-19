import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  font-size: 14px;
`;

const MainButton = styled.button`
  background-color: ${(props) => (props.$active ? "white" : "#edeff2")};
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  &:hover {
    background-color: ${(props) => (props.$active ? "None" : "#eaebed")};
  }
  box-shadow: ${(props) =>
    props.$active
      ? "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
      : "None"};
`;

const Childrens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export default function ButtonGroup({ icon, groupName, children, active, link }) {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <Container>
      <MainButton
        $active={location.pathname.includes(link)}
        onClick={() => {
          navigate(link);
        }}
      >
        {icon} {groupName}
      </MainButton>
      <Childrens>{active && children}</Childrens>
    </Container>
  );
}
