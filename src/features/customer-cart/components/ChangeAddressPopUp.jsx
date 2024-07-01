import React from "react";
import CustomPopUp from "./CustomPopUp";
import styled from "styled-components";
import { useState } from "react";
import dchc from "@/shared/data/dchc";
import { GetUserAddressRequest } from "@/features/account-address/api/addressApi";
import { FaRegCircleCheck } from "react-icons/fa6";
import XButton from "@/shared/components/Button/XButton";

const StyledPopUp = styled(CustomPopUp)`
  padding: 0;
  font-family: "Open Sans";
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;

  height: 30rem;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const AddressItem = styled.div`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  & h4 {
    font-weight: 500;
    letter-spacing: 1px;
  }

  > div:nth-of-type(3) {
    display: flex;
    gap: 10px;

    > span {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    gap: 10px;

    > span {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  > div:nth-of-type(4) {
    display: flex;
    gap: 1rem;

    > button {
      border: none;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
    }

    > button:nth-of-type(1) {
      background-color: #626455;
      border: none;
      color: white;
    }

    > button:nth-of-type(2) {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    > button:nth-of-type(3) {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
  }

  border: ${(props) => (props.$active ? "1px solid blue" : "none")};
`;

const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;

  > p {
    display: flex;
    gap: 1rem;

    > span {
      display: flex;
      align-items: center;
      gap: 3px;
      color: #41c464;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 0 1rem;

  > h4 {
    font-weight: 400;
    font-size: 16px;
  }

  > svg {
    transform: translate(30%, -90%);
    background-color: white;
    &:hover {
      background-color: white;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem 1rem 0;

  > button {
    border: none;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
`;

export default function ChangeAddressPopUp({ action, state, setState }) {
  const getUserAddressRequest = GetUserAddressRequest();

  return (
    <StyledPopUp action={() => {}}>
      <Header>
        <h4>Address Books</h4>
        <XButton action={action} />
      </Header>
      <AddressContainer>
        {getUserAddressRequest.isSuccess &&
          getUserAddressRequest.data.data.map((address) => {
            const province = dchc.data.find((item) => item.level1_id == address.province);
            const district = province.level2s.find((item) => item.level2_id == address.district);
            const ward = district.level3s.find((item) => item.level3_id == address.ward);
            return (
              <AddressItem $active={address.id == state.id}>
                <AddressHeader>
                  <p>
                    <h4>{address.fullName}</h4>
                    {address.isDefault && (
                      <span>
                        <FaRegCircleCheck /> Default Address
                      </span>
                    )}
                  </p>
                </AddressHeader>
                <div>
                  <span>Address:</span>
                  <p>
                    {province.name}, {district.name}, {ward.name}, {address.addressDetail}
                  </p>
                </div>
                <div>
                  <span>Phone number: </span>
                  {address.phoneNumber}
                </div>
                <div>
                  <button onClick={() => setState(address)}>Delivery to this Adderss</button>
                  <button>Change</button>
                  <button>Delete</button>
                </div>
              </AddressItem>
            );
          })}
      </AddressContainer>
      <Buttons>
        <button>Add New Address</button>
      </Buttons>
    </StyledPopUp>
  );
}
