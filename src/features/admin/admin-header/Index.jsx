import styled from "styled-components";
import logo from "@/shared/assets/images/Art_Logo.png";
import Avatar from "react-avatar";
import { AdminRequest } from "@/shared/api/adminApi";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Container = styled.div`
  height: 3.8rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const ImageContainer = styled.img`
  width: 7.5rem;
`;

const LeftContent = styled.div``;

const RightContent = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  cursor: pointer;
  border-radius: 25px;
  padding: 5px 1rem;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #0a68ff;
  /* border: 1px solid #0a68ff; */
`;

const DropDown = styled.div`
  position: absolute;
  font-size: 14px;
  transform: translate(-40%, 5%);

  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  > button {
    border: none;
    background-color: white;
    width: 100%;
    padding: 10px 1rem;
    width: 12rem;

    cursor: pointer;
    &:hover {
      background-color: #0a68ff;
      color: white;
    }
  }
`;

export default function AdminHeader() {
  const adminRequest = AdminRequest();
  const [dropDown, setDropDown] = useState(false);

  const buttonRef = useRef();
  const dropDownRef = useRef();

  useEffect(() => {
    const mouseDownEvent = (ev) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(ev.target) &&
        !buttonRef.current.contains(ev.target)
      ) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", mouseDownEvent);

    return () => {
      document.removeEventListener("mousedown", mouseDownEvent);
    };
  }, []);

  const onLogout = () => {
    localStorage.removeItem("ADMIN_ACCESS_TOKEN");
    adminRequest.refetch();
  };

  return (
    <Container>
      <LeftContent>
        <ImageContainer src={logo} />
      </LeftContent>
      <RightContent>
        <UserButton ref={buttonRef} onClick={() => setDropDown((prev) => !prev)}>
          {adminRequest.data.data.fullname}
          <Avatar
            src={import.meta.env.VITE_API_IMAGE_PATH + adminRequest.data.data.avatar}
            name={adminRequest.data.data.email}
            size="30"
            round={true}
          />
        </UserButton>
        {dropDown && (
          <DropDown ref={dropDownRef}>
            <button>Change password</button>
            <button onClick={onLogout}>Log out</button>
          </DropDown>
        )}
      </RightContent>
    </Container>
  );
}
