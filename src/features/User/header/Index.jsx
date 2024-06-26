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
import { ReadCategoryRequest } from "@/shared/api/categoryApi";
import { readCategoriesData } from "@/shared/utils/readCategoriesData";
import arts from "@/shared/assets/images/ArTS.svg";
import { GetCartQuantityRequest } from "./api/cartQuantityApi";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const StyledContainer = styled.div`
  background-color: #0272c0;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 9.5fr;
  column-gap: 1rem;
  align-items: center;

  max-width: 1280px;

  padding: 15px;
  margin: auto;
`;

const StyledContainerLogo = styled.div`
  width: 7.5rem;
  height: 5rem;
`;

const StyledLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

const StyledHeaderCustomer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;

  & svg {
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    color: white;
    cursor: pointer;
  }

  > div {
    position: relative;
  }
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

  > a {
    background-color: white;
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 10px 2rem;
    text-decoration: none;

    &:hover {
      background-color: #f5f5fa;
    }
  }

  &:hover {
    display: flex;
    flex-direction: column;
  }
`;

const UserContainer = styled.div`
  display: flex;
  color: white;
  cursor: pointer;

  &:hover + div {
    display: flex;
    flex-direction: column;
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

const Main = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  column-gap: 1rem;
`;

const Button = styled.button`
  background-color: inherit;
  border: none;
  color: white;
`;

const Cart = styled(Link)`
  position: relative;
`;

const CartQuantity = styled.span`
  position: absolute;
  background-color: #ff424f;
  font-size: 12px;
  top: 0;
  right: 0;
  border-radius: 50%;
  padding: 0 6px;
  font-weight: 700;
  color: white;
  transform: translate(15px, -15px);
`;

export default function UserNavbar() {
  const readCategoryRequest = ReadCategoryRequest();
  const getCartQuantityRequest = GetCartQuantityRequest();

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
        <StyledHeader>
          <StyledContainerLogo>
            <StyledLogo src={arts} alt="Logo" />
          </StyledContainerLogo>
          <Main>
            <StyledSearchBar>
              <StyledInputSearch type="text" placeholder="Search desired products, categories..." />
            </StyledSearchBar>
            <StyledHeaderCustomer>
              <FaHome
                onClick={() => {
                  navigate("/");
                }}
              />
              <div>
                <UserContainer>
                  {customerRequest.isSuccess ? (
                    <Avatar
                      round
                      size="2rem"
                      name={customerRequest.data.data.fullname}
                      src={import.meta.env.VITE_API_IMAGE_PATH + customerRequest.data.data.avatar}
                    />
                  ) : (
                    <FaUser
                      onClick={() => {
                        if (customerRequest.isError) {
                          setIsPopUpVisible(true);
                          setIsLoginForm(true);
                        }
                      }}
                    />
                  )}
                  {customerRequest.isSuccess && <FaSortDown />}
                </UserContainer>
                {customerRequest.isSuccess && (
                  <UserDropDown>
                    <Link to={"/account/account-information"}>Account detail</Link>
                    <Link>My order</Link>
                    <Link
                      onClick={() => {
                        localStorage.removeItem("ACCESS_TOKEN");
                        customerRequest.refetch();
                        getCartQuantityRequest.refetch();
                      }}
                    >
                      Logout
                    </Link>
                  </UserDropDown>
                )}
              </div>
              <Cart to="/cart">
                <FaShoppingCart />
                {getCartQuantityRequest.isSuccess && (
                  <CartQuantity>{getCartQuantityRequest.data.data}</CartQuantity>
                )}
              </Cart>
            </StyledHeaderCustomer>
            <div>
              {readCategoriesData(readCategoryRequest).map((item, key) => {
                return <Button key={key}>{item.name}</Button>;
              })}
            </div>
          </Main>
        </StyledHeader>
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
