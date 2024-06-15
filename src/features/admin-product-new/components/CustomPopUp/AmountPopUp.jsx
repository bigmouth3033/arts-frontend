import React from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import { useState } from "react";
import styled from "styled-components";
import TextInput from "@/shared/components/Input/TextInput";
import { useEffect } from "react";

const StyledPopUp = styled(PopUp)`
  max-width: 600px;
  padding: 0;
`;

const Header = styled.div`
  font-size: 18px;
  padding: 1rem;
`;

const Content = styled.div`
  & h4 {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
  padding: 0 2rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;

  > button {
    background-color: white;
    cursor: pointer;
    padding: 5px 15px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 1rem 0;

  & button {
    cursor: pointer;
  }

  > div {
    display: flex;
    gap: 1rem;

    > input {
      width: 20rem;
    }
  }
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  & input {
    width: 10rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const regex = /^-?\d+(\.\d+)?$/;

export default function AmountPopUp({ action, state, setState }) {
  const [stock, setStock] = useState(new Array(state.length).fill(""));
  const [costPerItem, setCostPerItem] = useState(new Array(state.length).fill(""));

  useEffect(() => {
    for (let i = 0; i < state.length; i++) {
      stock[i] = state[i].inventory;
      costPerItem[i] = state[i].beginFund;
    }

    setStock([...stock]);
    setCostPerItem([...costPerItem]);
  }, []);

  const onConfirm = () => {
    for (let i = 0; i < state.length; i++) {
      state[i].inventory = stock[i];
      state[i].beginFund = costPerItem[i];
    }
    setState();
    action();
  };

  return (
    <StyledPopUp action={() => {}}>
      <Header>Edit Amount</Header>
      <hr />
      <Content>
        <ContentBody>
          {state.map((item, key) => {
            return (
              <div key={key}>
                <span>{item.variant.join("/")}</span>
                <InputContainer>
                  <div>
                    <h4>Stock</h4>
                    <TextInput
                      state={stock[key]}
                      setState={(value) => {
                        if (regex.test(value) || value == "") {
                          const newList = [...stock];
                          newList[key] = value;
                          setStock(newList);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h4>Cost per item</h4>
                    <TextInput
                      setState={(value) => {
                        if (regex.test(value) || value == "") {
                          const newList = [...costPerItem];
                          newList[key] = value;
                          setCostPerItem(newList);
                        }
                      }}
                      state={costPerItem[key]}
                    />
                  </div>
                </InputContainer>
              </div>
            );
          })}
        </ContentBody>
      </Content>
      <hr />
      <Button>
        <button onClick={onConfirm}>Ok</button>
        <button onClick={action}>Cancel</button>
      </Button>
    </StyledPopUp>
  );
}
