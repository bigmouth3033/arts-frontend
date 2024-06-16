import React from "react";
import Avatar from "react-avatar";
import {
  FaUser,
  FaEye,
  FaMoneyBillWave,
  FaHeadphonesAlt,
} from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import {
  MdAssignmentReturn,
  MdOutlineBorderColor,
  MdOutlinePayment,
  MdReviews,
  MdFavorite,
} from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { IoStarHalfOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import styled from "styled-components";
import AccountInformation from "./account-information/Index";
const StyledBackground = styled.div`
  width: 100%;
  background-color: #f5f5fa;
`;
const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 5fr;
  color: gray;
  padding-top: 2rem;
`;

const StyledAside = styled.div``;
const StyledDataLoad = styled.div``;

const StyledWrapItemAvatar = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  column-gap: 0.7rem;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 13px;
  cursor: pointer;
  :nth-child(1) {
    margin: 0 auto;
  }
`;
const StyledAvatarText = styled.div`
  font-size: 1rem;
  color: black;
  font-weight: 600;
`;
const StyledSpan = styled.p`
  font-size: 13px;
  color: gray;
`;
const StyledWrapItem = styled(StyledWrapItemAvatar)``;
const StyledAvatar = styled(Avatar)`
  border-radius: 50%;
  font-size: 14px;
`;
const StyledTitleAside = styled.div`
  font-size: 20px;
  line-height: 32px;
  font-weight: 300;
  margin: 1rem 0px 12px;
  color: black;
`;
const StyledContainerChildAside = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 100%;
  height: 40rem;
  padding: 20px 25px;
`;
export default function Account() {
  return (
    <StyledBackground>
      <StyledContainer>
        <StyledAside>
          <StyledWrapItemAvatar>
            <StyledAvatar
              color={Avatar.getRandomColor("sitebase", ["red", "green"])}
              name="Wim Mostmans"
              size="3.5rem"
            />
            <StyledAvatarText>
              <StyledSpan>Account of</StyledSpan> Wim Mostmans
            </StyledAvatarText>
          </StyledWrapItemAvatar>
          <StyledWrapItem>
            <FaUser size="25px" />
            <div>Account information</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <IoIosNotifications size="25px" />
            <div>My Notifications</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <MdOutlineBorderColor size="25px" />
            <div>Order Management</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <MdAssignmentReturn size="25px" />
            <div>Manage returns</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <GiPositionMarker size="25px" />
            <div>Address book</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <MdOutlinePayment size="25px" />
            <div>Payment Information </div>
          </StyledWrapItem>
          <StyledWrapItem>
            <MdReviews size="25px" />
            <div>Product Reviews</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <FaEye size="25px" />
            <div>Products you've viewed</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <MdFavorite size="25px" />
            <div>Favorite Products</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <IoStarHalfOutline size="25px" />
            <div>My Comment</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <FaMoneyBillWave size="25px" />
            <div>Discount Code</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <FaBook size="25px" />
            <div>My Bookcare</div>
          </StyledWrapItem>
          <StyledWrapItem>
            <FaHeadphonesAlt size="25px" />
            <div>Customer Support</div>
          </StyledWrapItem>
        </StyledAside>
        <StyledDataLoad>
          <StyledTitleAside>Something</StyledTitleAside>
          <StyledContainerChildAside>
            <AccountInformation />
          </StyledContainerChildAside>
        </StyledDataLoad>
      </StyledContainer>
    </StyledBackground>
  );
}
