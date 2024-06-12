import React from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import { useState } from "react";
import styled from "styled-components";

const StyledPopUp = styled(PopUp)`
  max-width: 600px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  padding: 1rem;
  gap: 0.5rem;
  border: 1px dotted rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  font-size: 19px;
`;

const ImageContainer = styled.div`
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  border: ${(props) =>
    props.$active == true ? "1px solid rgba(0, 0, 255, 1)" : "1px solid rgba(0, 0, 0, 0.4)"};
  cursor: pointer;

  & img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function ImagePopUp({ action, images, state, setState }) {
  return (
    <StyledPopUp action={action}>
      <Header>Update variant image</Header>
      <Content>
        {images.map((item, index) => {
          return (
            <ImageContainer $active={item == state} onClick={() => setState(item)} key={index}>
              <img src={URL.createObjectURL(item)} />
            </ImageContainer>
          );
        })}
      </Content>
    </StyledPopUp>
  );
}
