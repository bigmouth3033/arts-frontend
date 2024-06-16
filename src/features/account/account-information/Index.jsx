import React, { useState, useRef } from "react";
import Avatar from "react-avatar";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: gray;
  column-gap: 1rem;
`;

const StyledPersonInfor = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

const StyledWrapAvatarFullname = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 1rem 0 2rem 0;
  column-gap: 1rem;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  border-radius: 50%;
  font-size: 14px;
`;

const StylecWrapName = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  font-size: 14px;
  column-gap: 0.3rem;
`;

const StyledInputFullName = styled.input`
  border: 1px solid gray;
  border-radius: 4px;
  height: 2rem;
  padding: 0.5rem;
  &:focus,
  :hover {
    outline: none;
    border-color: #3e6807; /* Example of changing border color on focus/hover */
  }
`;

const StyledBirthday = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 2rem;
  align-items: center;
`;

const StyledWrapCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDay = styled.div`
  width: 30%;
  height: 2.2rem;
  border: 1px solid gray;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  cursor: pointer;
  position: relative;
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const StyledDropdownItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function AccountInformation() {
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

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
    <StyledContainer>
      <div>
        <StyledPersonInfor>Personal Information</StyledPersonInfor>
        <StyledWrapAvatarFullname>
          <StyledAvatar
            color={Avatar.getRandomColor("sitebase", ["red", "green"])}
            name="Wim Mostmans"
            size="5rem"
          />
          <StylecWrapName>
            <div>Full Name & Username</div>
            <StyledInputFullName placeholder="Enter your full name" />
          </StylecWrapName>
        </StyledWrapAvatarFullname>
        <StyledBirthday>
          <div>Birthday</div>
          <StyledWrapCalendar>
            <StyledDay onClick={handleDayClick}>
              {selectedDay && <div>{selectedDay}</div>}
              <RiArrowDropDownLine size="30px" />
              {showDayDropdown && (
                <StyledDropdown>
                  {[
                    ...Array(daysInMonth(selectedMonth, selectedYear)).keys(),
                  ].map((day) => (
                    <StyledDropdownItem
                      key={day + 1}
                      onClick={() => handleSelectDay(day + 1)}
                    >
                      {day + 1}
                    </StyledDropdownItem>
                  ))}
                </StyledDropdown>
              )}
            </StyledDay>
            <StyledDay onClick={handleMonthClick}>
              {selectedMonth && <div>{selectedMonth}</div>}
              <RiArrowDropDownLine size="30px" />
              {showMonthDropdown && (
                <StyledDropdown>
                  {[...Array(12).keys()].map((month) => (
                    <StyledDropdownItem
                      key={month + 1}
                      onClick={() => handleSelectMonth(month + 1)}
                    >
                      {month + 1}
                    </StyledDropdownItem>
                  ))}
                </StyledDropdown>
              )}
            </StyledDay>
            <StyledDay onClick={handleYearClick}>
              {selectedYear && <div>{selectedYear}</div>}
              <RiArrowDropDownLine size="30px" />
              {showYearDropdown && (
                <StyledDropdown>
                  {[...Array(125).keys()].map((index) => {
                    const year = 1900 + index;
                    return (
                      <StyledDropdownItem
                        key={year}
                        onClick={() => handleSelectYear(year)}
                      >
                        {year}
                      </StyledDropdownItem>
                    );
                  })}
                </StyledDropdown>
              )}
            </StyledDay>
          </StyledWrapCalendar>
        </StyledBirthday>
        {/* Additional sections for more information */}
      </div>
      <div>Other content (placeholder)</div>
    </StyledContainer>
  );
}
