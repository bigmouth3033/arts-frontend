import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h3 {
    font-size: 20px;
    font-weight: 100;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterBar = styled.div`
  background-color: white;

  display: flex;
`;

const FilterButton = styled.button`
  background-color: white;
  border: none;
  padding: 10px 0;

  flex: 1;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  font-size: 15px;
  transition: all 0.4s;

  border-bottom: ${(props) =>
    props.$active ? "2px solid rgb(13,92,182)" : "2px solid rgba(0,0,0,0)"};
`;

export default function AccountManageExchange() {
  const [active, setActive] = useState("");

  return (
    <Container>
      <h3>Manage Exchange Return</h3>
      <FilterBar>
        <FilterButton $active={active == "All"} onClick={() => setActive("All")}>
          All
        </FilterButton>
        <FilterButton $active={active == "Pending"} onClick={() => setActive("Pending")}>
          Pending
        </FilterButton>
        <FilterButton $active={active == "Accepted"} onClick={() => setActive("Accepted")}>
          Accepted
        </FilterButton>
        <FilterButton $active={active == "Denied"} onClick={() => setActive("Denied")}>
          Denied
        </FilterButton>
      </FilterBar>
      <Content></Content>
    </Container>
  );
}
