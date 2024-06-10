import React from "react";
import styled from "styled-components";
import Select from "react-select";

const Input = styled(Select)`
  border-radius: 3px;

  border: 1px solid rgba(0, 0, 0, 0.1);

  transition: all 0.3s;
  & * {
    cursor: pointer;
    outline: none !important;
    border: none !important;
  }
`;

export default function SelectInput({ state, setState, options }) {
  return <Input defaultValue={state} onChange={setState} options={options} />;
}
