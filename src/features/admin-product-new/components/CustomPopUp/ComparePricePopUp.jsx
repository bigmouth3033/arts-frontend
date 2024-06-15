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
  gap: 1rem;
  margin: 2rem 0;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & input {
    width: 10rem;
  }
`;

const regex = /^-?\d+(\.\d+)?$/;

export default function ComparePricePopUp({ action, state, setState }) {
  const [allPrice, setAllPrice] = useState("");
  const [prices, setPrices] = useState(new Array(state.length).fill(""));

  const applyAllPrices = () => {
    for (let i = 0; i < prices.length; i++) {
      prices[i] = allPrice;
    }

    setPrices([...prices]);
  };

  const onConfirm = () => {
    for (let i = 0; i < prices.length; i++) {
      state[i].comparePrice = prices[i];
    }

    setState();
    action();
  };

  useEffect(() => {
    state.forEach((item, index) => (prices[index] = item.comparePrice));
    setPrices([...prices]);
  }, []);

  return (
    <StyledPopUp action={() => {}}>
      <Header>Edit compare price</Header>
      <hr />
      <Content>
        <ContentHeader>
          <h4>Apply compare price for all variants</h4>
          <div>
            <TextInput
              placeholder={"0"}
              state={allPrice}
              setState={(value) => {
                if (regex.test(value) || value == "") {
                  setAllPrice(value);
                }
              }}
            />
            <button onClick={() => applyAllPrices()}>Apply</button>
          </div>
        </ContentHeader>
        <hr />
        <ContentBody>
          {state.map((item, key) => {
            return (
              <div key={key}>
                <span>{item.variant.join("/")}</span>
                <TextInput
                  placeholder={0}
                  state={prices[key]}
                  setState={(value) => {
                    if (regex.test(value) || value == "") {
                      const newList = [...prices];
                      newList[key] = value;
                      setPrices(newList);
                    }
                  }}
                />
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
