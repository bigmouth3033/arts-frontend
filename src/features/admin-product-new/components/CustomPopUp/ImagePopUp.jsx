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

  > p {
    grid-column: 1/4;
  }
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
    props.$chosen == true ? "3px solid #007ACE" : "1px solid rgba(0, 0, 255, 0.4)"};
  cursor: pointer;

  & img {
    width: 100% !important;
    display: block;
    object-fit: cover;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  > button {
    background-color: white;
    cursor: pointer;
    padding: 5px 15px;
  }
`;

export default function ImagePopUp({ action, images, state, setState }) {
  const [id, setId] = useState(state);

  return (
    <StyledPopUp action={() => {}}>
      <Header>Update variant image</Header>
      <Content>
        {images.length > 0 ? (
          images.map((item, index) => {
            return (
              <ImageContainer
                key={index}
                $chosen={index == id}
                $active={index == state}
                onClick={() => setId(index)}
              >
                <img src={URL.createObjectURL(item)} />
              </ImageContainer>
            );
          })
        ) : (
          <p>Please upload product images first</p>
        )}
      </Content>
      <Button>
        <button
          onClick={() => {
            setState(id);
            action();
          }}
        >
          Ok
        </button>
        <button onClick={action}>Cancel</button>
      </Button>
    </StyledPopUp>
  );
}
