import React from "react";
import styled from "styled-components";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

const StyledContainerFooter = styled.div`
  width: 100%;
  background-color: #8aaae5;
  color: #ffffff;
`;

const StyledContainer = styled.div`
  max-width: 1230px;
  margin: 0 auto;
  padding: 2rem 0 0 0;
`;

const StyledFooterMain = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  columns: 2rem;
`;
const StyledFooterTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const StyledFooterMianItem = styled.div``;
const StyledWrapText = styled.div`
  padding: 0 1rem 0;
  line-height: 2.5;
  font-size: 15px;
`;
const StyledContainerBottom = styled(StyledContainer)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
  padding: 1rem 0;
`;
const StyledWrapEmail = styled.div`
  width: 80%;
`;
const StyledInputEmail = styled.input`
  width: 80%;
  border: none;
  border-radius: 5px 0 0 5px;
  height: 2.3rem;
  padding: 0 0 0 1rem;
  background-color: #8a94e5;
  color: #ffffff;

  &:focus,
  :hover {
    outline: none;
  }
`;
const StyledButtonRegister = styled.button`
  width: 20%;
  border: none;
  border-radius: 0 5px 5px 0;
  height: 2.3rem;
  cursor: pointer;
  background-color: #f7d391;
  color: #ffffff;
`;
const StyledNameShop = styled.h1`
  font-family: "Pacifico", cursive;
  color: #ffffff;
  font-size: 3rem;
  margin: 0;
`;
const StyledContactSocial = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  align-items: center;
  svg {
    color: #ffffff; // Màu chủ đạo của footer
  }
`;
export default function Footer() {
  return (
    <StyledContainerFooter>
      <StyledContainer>
        <StyledFooterMain>
          <StyledFooterMianItem>
            <StyledFooterTitle>ABOUT ARTS</StyledFooterTitle>
            <StyledWrapText>
              <div>The Story of Grass</div>
              <div>About the factory</div>
            </StyledWrapText>
          </StyledFooterMianItem>
          <div>
            <StyledFooterTitle>COMMUNITY ACTIVITIES</StyledFooterTitle>
            <StyledWrapText>
              <div>Building a school for children</div>
              <div>Fragrant hands</div>
              <div>Joining hands to prevent COVID</div>
            </StyledWrapText>
          </div>
          <div>
            <StyledFooterTitle>SHOPPING GUIDE</StyledFooterTitle>
            <StyledWrapText>
              <div>Purchase and Payment Policy</div>
              <div>Warranty</div>
              <div>Return and Refund Policy</div>
              <div>Information Privacy Policy</div>
            </StyledWrapText>
          </div>
          <div>
            <StyledFooterTitle>CONTACT INFO</StyledFooterTitle>
            <StyledWrapText>
              <div>cskh.so@comem.vn</div>
              <div>096.862.2511</div>
            </StyledWrapText>
          </div>
        </StyledFooterMain>
      </StyledContainer>
      <StyledContainerBottom>
        <StyledWrapEmail>
          <StyledInputEmail />
          <StyledButtonRegister>Register</StyledButtonRegister>
        </StyledWrapEmail>
        <StyledNameShop>Arts</StyledNameShop>
        <StyledContactSocial>
          <a href="https://www.facebook.com/sinh.lam.5099" target="_blank">
            <FaFacebook size="45px" />
          </a>

          <a
            href="https://www.tiktok.com/@lamsinh?_t=8n8HnrWcJaK&_r=1"
            target="_blank"
          >
            <AiFillTikTok size="55px" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCRzBlHTtK8avKuBEoPDW_xQ"
            target="_blank"
          >
            <FaYoutube size="60px" />
          </a>
        </StyledContactSocial>
      </StyledContainerBottom>
    </StyledContainerFooter>
  );
}
