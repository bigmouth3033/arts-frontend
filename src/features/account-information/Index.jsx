import React, { useState, useRef } from "react";
import Avatar from "react-avatar";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import TextInput from "@/shared/components/Input/TextInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import NumberInput from "@/shared/components/Input/NumberInput";
import { CustomerRequest } from "@/shared/api/customerApi";

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
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: white;
  padding: 2rem 1rem;
  column-gap: 3rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > div {
    display: flex;
    align-items: center;

    > span {
      width: 30%;
      text-align: right;
      padding-right: 1rem;
    }

    > input {
      width: 70%;
    }
  }

  & span {
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
  }
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Image = styled.div`
  padding: 1rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  align-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > button {
    background-color: white;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
  }

  > p {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Date = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;

  > button {
    background-color: #0b74e5;
    border: none;
    color: white;
    padding: 0.4rem 2rem;
    cursor: pointer;
  }
`;

export default function AccountInformation() {
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const customerRequest = CustomerRequest();

  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  // Function to calculate number of days in a given month and year
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const handleDayClick = () => {
    setShowDayDropdown(!showDayDropdown);
    setShowMonthDropdown(false); // Close other dropdowns
    setShowYearDropdown(false);
  };

  const handleMonthClick = () => {
    setShowMonthDropdown(!showMonthDropdown);
    setShowDayDropdown(false); // Close other dropdowns
    setShowYearDropdown(false);
  };

  const handleYearClick = () => {
    setShowYearDropdown(!showYearDropdown);
    setShowDayDropdown(false); // Close other dropdowns
    setShowMonthDropdown(false);
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setShowDayDropdown(false);
    dayInputRef.current && (dayInputRef.current.value = day);
    dayInputRef.current && dayInputRef.current.focus();
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
    monthInputRef.current && (monthInputRef.current.value = month);
    monthInputRef.current && monthInputRef.current.focus();
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
    yearInputRef.current && (yearInputRef.current.value = year);
    yearInputRef.current && yearInputRef.current.focus();
  };

  return (
    <Container>
      <h3>Account information</h3>
      <Content>
        <Detail>
          <div>
            <span>Full Name</span>
            <TextInput />
          </div>
          <div>
            <span>Phone Number</span>
            <TextInput />
          </div>
          <div>
            <span>Email</span>
            <TextInput />
          </div>
          <div>
            <span>Gender</span>
            <Gender>
              <input checked type="radio" name="gender" /> <label>Male</label>
              <input type="radio" name="gender" /> <label>Female</label>
              <input type="radio" name="gender" /> <label>Other</label>
            </Gender>
          </div>
          <div>
            <span>Date of Birth</span>
            <Date>
              <SelectInput options={[]} setState={() => {}} />{" "}
              <SelectInput options={[]} setState={() => {}} />{" "}
              <SelectInput options={[]} setState={() => {}} />
            </Date>
          </div>
          <div>
            <span></span>
            <ButtonContainer>
              <button>Save</button>
            </ButtonContainer>
          </div>
        </Detail>
        <Image>
          <Avatar name={customerRequest.data.data.fullname} round size="150" />
          <button>Choose Image</button>
          <p>
            <span>Maximum file size: 1 MB</span> <span>Formats: .JPEG, .PNG</span>
          </p>
        </Image>
      </Content>
    </Container>
  );
}
