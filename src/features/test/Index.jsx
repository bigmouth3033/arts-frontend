import styled from "styled-components";
import { useEffect, useState } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import dchc from "@/shared/data/dchc";
import TextInput from "@/shared/components/Input/TextInput";
import NumberInput from "@/shared/components/Input/NumberInput";

// animation icon
import AlertIcon from "@/shared/components/AnimationIcon/AlertIcon";
import ErrorIcon from "@/shared/components/AnimationIcon/ErrorIcon";
import SuccessIcon from "@/shared/components/AnimationIcon/SuccessIcon";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";

// popup
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import PopUp from "@/shared/components/PopUp/PopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";

// react-icon
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const ReactIcon = styled.div``;

const PopUps = styled.div``;

const StyledFaRegArrowAltCircleRight = styled(FaRegArrowAltCircleRight)`
  height: 100px;
  width: 100px;
  color: red;
`;

const SelectContainer = styled.div`
  margin: 5rem;
`;

const InputContainer = styled.div`
  margin: 5rem;
`;

const regex = /^-?\d+(\.\d+)?$/;

export default function Test() {
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [city, setCity] = useState("01");
  const [district, setDistrict] = useState("");

  const [textInputState, setTextInputState] = useState("");

  useEffect(() => {
    setDistrict("1");
  }, [city]);

  return (
    <Container>
      <Icons>
        <AlertIcon />
        <ErrorIcon />
        <SuccessIcon />
        <WaitingIcon />
      </Icons>
      <Buttons>
        <button onClick={() => setShowAlert(true)}>click alert</button>
        <button onClick={() => setShowError(true)}>click error</button>
        <button onClick={() => setShowSuccess(true)}>click success</button>
        <button onClick={() => setShowWaiting(true)}>click waiting</button>
      </Buttons>
      <PopUps>
        {showAlert && (
          <AlertPopUp
            header={"Thêm header vào"}
            message={"Thêm message vào"}
            action={() => setShowAlert(false)}
          />
        )}
        {showError && (
          <ErrorPopUp
            header={"Thêm header vào"}
            message={"Thêm message vào"}
            action={() => setShowError(false)}
          />
        )}
        {showSuccess && (
          <SuccessPopUp
            header={"Thêm header vào"}
            message={"Thêm message vào"}
            action={() => setShowSuccess(false)}
          />
        )}
        {showWaiting && (
          <WaitingPopUp
            header={"Thêm header vào"}
            message={"Thêm message vào"}
            action={() => setShowWaiting(false)}
          />
        )}
      </PopUps>
      <ReactIcon>
        <h5>Icon</h5>
        <p>
          <a href="https://react-icons.github.io/react-icons/">
            https://react-icons.github.io/react-icons/
          </a>
          <> </>Bấm link này để lấy icon
        </p>
        <div>
          <FaRegArrowAltCircleRight />
        </div>
        <p>Có thể sử dụng styled-components kế thừ để custom icon</p>
        <div>
          <StyledFaRegArrowAltCircleRight />
        </div>
      </ReactIcon>

      <SelectContainer>
        <SelectInput
          options={dchc.data.map((item) => {
            return { value: item.level1_id, label: item.name };
          })}
          state={city}
          setState={setCity}
        />
        <SelectInput
          options={dchc.data
            .find((item) => item.level1_id == city.value)
            ?.level2s.map((item) => {
              return { value: item.level2_id, label: item.name };
            })}
          state={district}
          setState={setDistrict}
        />
      </SelectContainer>

      <InputContainer>
        <TextInput />
        <NumberInput
          state={textInputState}
          setState={setTextInputState}
          placeholder={"input something"}
        />
      </InputContainer>
    </Container>
  );
}
