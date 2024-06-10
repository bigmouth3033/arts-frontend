import styled from "styled-components";
import logo from "@/shared/assets/images/Art_Logo.png";
import Avatar from "react-avatar";

const Container = styled.div`
  height: 3.8rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const ImageContainer = styled.img`
  width: 7.5rem;
`;

const LeftContent = styled.div``;

const RightContent = styled.div``;

export default function AdminHeader() {
  return (
    <Container>
      <LeftContent>
        <ImageContainer src={logo} />
      </LeftContent>
      <RightContent>
        <Avatar name="Foo Bar" size="30" round={true} />
      </RightContent>
    </Container>
  );
}
