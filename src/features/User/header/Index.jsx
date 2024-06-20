import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import Login from "@/features/authentication/login/Index";
import Register from "@/features/authentication/register/Index";
import PopUp from "@/shared/components/PopUp/PopUp";
import logo from "@/shared/assets/images/Art_Logo.png";
import XButton from "@/shared/components/Button/XButton";
import { FaHome } from "react-icons/fa";
import { CustomerRequest } from "@/shared/api/customerApi";
import { FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdCurrencyExchange } from "react-icons/md";

const StyledContainer = styled.div`
  background-color: #0272c0;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
`;

const StyledHeaderTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  column-gap: 1rem;
  align-items: center;
  padding: 0 6rem;
`;

const StyledContainerLogo = styled.div`
  width: 7.5rem;
  height: 4rem;
`;

const StyledLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: auto;
  position: relative;
  font-style: italic;
`;

const StyledInputSearch = styled.input`
  height: 2.4rem;
  width: 100%;
  border-radius: 1.5rem;
  border: none;
  padding-left: 2rem;
  box-sizing: border-box;

  &:focus,
  &:hover {
    outline: none;
  }
`;

const StyledSearchIcon = styled(FaSearch)`
  position: absolute;
  right: 0.75rem;
  color: #8aaae5;
  font-weight: 100;
`;

const StyledHeaderCustomer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;

  & svg {
    font-size: 1.4rem;
    color: white;
    cursor: pointer;
  }

  > div {
    position: relative;
  }
`;

const StyledHeaderBot = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  column-gap: 2rem;
  padding: 5px 6.5rem;
`;

const StyledContainerCategory = styled.div`
  display: flex;
  column-gap: 3rem;
  align-items: center;
  color: #ffffff;

  > button {
    transition: all 0.2s;
    background-color: #0272c0;
    border: none;
    font-size: 14px;
    font-weight: 700;
    color: white;
    border-bottom: 2px solid #0272c0;
    cursor: pointer;

    &:hover {
      border-bottom: 2px solid white;
    }
  }
`;

const StyledContainerAboutArts = styled.div`
  color: #ffffff;
  display: flex;
  column-gap: 2.5rem;
  align-items: center;
`;

const StyedPopUp = styled(PopUp)`
  width: 450px;
  padding: 0;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledXButton = styled(XButton)`
  background-color: white;
  transform: translate(50%, -30%);

  &:hover {
    background-color: white;
  }
`;

const UserDropDown = styled.div`
  position: absolute;
  display: none;
  width: 12rem;
  transform: translate(-9rem, 0);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;

  > button {
    background-color: white;
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 10px 2rem;

    &:hover {
      background-color: #f5f5fa;
    }
  }

  &:hover {
    display: block;
  }
`;

const UserContainer = styled.div`
  display: flex;

  &:hover + div {
    display: block;
  }
`;

const Exchange = styled.div`
  background-color: #0057a0;
  display: flex;
  align-items: center;
  justify-content: center;
  > h4 {
    cursor: pointer;
    padding: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    > span {
      color: #808080;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 700;
      font-size: 18px;
    }
  }
`;

export default function UserNavbar() {
  const customerRequest = CustomerRequest();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const switchToRegister = () => {
    setIsLoginForm(false);
  };

  const switchToLogin = () => {
    setIsLoginForm(true);
  };

  return (
    <>
      <StyledContainer>
        <StyledHeaderTop>
          <StyledContainerLogo>
            <StyledLogo src={logo} alt="Logo" />
          </StyledContainerLogo>
          <StyledSearchBar>
            <StyledInputSearch type="text" placeholder="Search desired products, categories..." />
            <StyledSearchIcon size="1.4rem" />
          </StyledSearchBar>
          <StyledHeaderCustomer>
            <FaHome
              onClick={() => {
                navigate("/");
              }}
            />
            <div>
              <UserContainer>
                <FaUser
                  onClick={() => {
                    if (customerRequest.isError) {
                      setIsPopUpVisible(true);
                      setIsLoginForm(true);
                    }
                  }}
                />
                {customerRequest.isSuccess && <FaSortDown />}
              </UserContainer>
              {customerRequest.isSuccess && (
                <UserDropDown>
                  <button>Account detail</button>
                  <button>My order</button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("ACCESS_TOKEN");
                      customerRequest.refetch();
                    }}
                  >
                    Logout
                  </button>
                </UserDropDown>
              )}
            </div>
            <FaShoppingCart />
          </StyledHeaderCustomer>
        </StyledHeaderTop>
        <StyledHeaderBot>
          <StyledContainerCategory>
            <button>Sale</button>
            <button>Office</button>
            <button>Personal Items</button>
            <button>Souvenirs</button>
            <button>Gifts</button>
            <button>Others</button>
          </StyledContainerCategory>
          <StyledContainerAboutArts>
            <h4>About Arts</h4>
            <h4>Blog</h4>
          </StyledContainerAboutArts>
        </StyledHeaderBot>
        <Exchange>
          <h4>
            <span>
              <MdCurrencyExchange />7 Days
            </span>
            Change of Mind Policy
          </h4>
        </Exchange>
      </StyledContainer>
      {isPopUpVisible && (
        <StyedPopUp action={() => {}}>
          <div>
            <StyledXButton action={() => setIsPopUpVisible(false)} />
          </div>
          {isLoginForm ? (
            <Login switchToRegister={switchToRegister} action={() => setIsPopUpVisible(false)} />
          ) : (
            <Register switchToLogin={switchToLogin} />
          )}
        </StyedPopUp>
      )}
    </>
  );
}
