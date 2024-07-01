import styled from "styled-components";
import { useState } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import { BiLabel } from "react-icons/bi";
import { GetOrderDetailRequest } from "../account-order-detail/api/orderDetailApi";
import { useSearchParams } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { Link } from "react-router-dom";
import emptyImage from "./assets/images/empty-order.png";
import { SendRefundRequest } from "./api/refundApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { useNavigate } from "react-router-dom";

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
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  padding: 1rem;
`;

const Image = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > span {
    position: absolute;
    right: 0;
    transform: translateY(-100%);
    background-color: rgb(235, 235, 240);
    padding: 3px 10px;
    border-top-left-radius: 10px;
  }
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

const StyledLinkNoDecoration = styled(StyledLink)`
  text-decoration: none;
`;

const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 10fr 1fr;
  column-gap: 1rem;

  padding: 20px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  & .variant-text {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }

  & .price {
    font-size: 1.1rem;
    color: red;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 10px;
  > button {
    background-color: white;
    color: #0b74e5;
    border-radius: 5px;
    border: 1px solid #0b74e5;
    padding: 8px 8px;
    cursor: pointer;
  }
`;

const NoOrder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;

  > img {
    width: 20rem;
  }

  > p {
    font-size: 16px;
  }
`;

const exchangeOptions = [
  { value: "exchange", label: "Exchage product" },
  { value: "refund", label: "Return the product" },
];

const reasonOptions = [
  { value: "Received the wrong item", label: "Received the wrong item" },
  { value: "Item arrived damaged", label: "Item arrived damaged" },
  { value: "Item is defective or malfunctioning", label: "Item is defective or malfunctioning" },
  {
    value: "Product does not match the description",
    label: "Product does not match the description",
  },
  { value: "Ordered the wrong item by mistake", label: "Ordered the wrong item by mistake" },
  { value: "Changed my mind about the purchase", label: "Changed my mind about the purchase" },
  { value: "Found a better price for the item", label: "Found a better price for the item" },
  { value: "Received more items than ordered", label: "Received more items than ordered" },
  { value: "Item arrived later than expected", label: "Item arrived later than expected" },
];

export default function AccountExchangeRequest() {
  const navigtate = useNavigate();
  const [exchangeChoice, setExchangeChoice] = useState(exchangeOptions[0]);
  const [exchangeReason, setExchangeReason] = useState(reasonOptions[0]);
  let [searchParams, setSearchParams] = useSearchParams();
  const sendRefundRequest = SendRefundRequest();
  const [success, setSuccess] = useState(false);

  const getOrderDetailRequest = GetOrderDetailRequest(searchParams.get("id"));

  if (getOrderDetailRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (
    getOrderDetailRequest.data.data == null ||
    getOrderDetailRequest.data.data.refund != null ||
    getOrderDetailRequest.data.data.orderStatusId != 16
  ) {
    return (
      <NoOrder>
        <img src={emptyImage} />
        <p>There is no order</p>
      </NoOrder>
    );
  }

  const onReturn = () => {
    if (exchangeChoice.value == "refund") {
      const formData = new FormData();
      formData.append("OrderId", getOrderDetailRequest.data.data.id);
      formData.append("ReasonRefund", exchangeReason.value);

      sendRefundRequest.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            setSuccess(true);
          }
        },
      });
    }
  };

  return (
    <Container>
      <h3>Exchange</h3>
      <Content>
        <div>
          <h4>Item return</h4>
          <ProductDetail>
            <Image>
              <img
                src={
                  import.meta.env.VITE_API_IMAGE_PATH +
                  (getOrderDetailRequest.data.data.variant.variantImage
                    ? getOrderDetailRequest.data.data.variant.variantImage
                    : getOrderDetailRequest.data.data.variant.product.productImages[0].imageName)
                }
              />
              <span>X{getOrderDetailRequest.data.data.quanity}</span>
            </Image>
            <div>
              <StyledLinkNoDecoration
                to={`/productdetail?id=${getOrderDetailRequest.data.data.variant.product.id}`}
              >
                {getOrderDetailRequest.data.data.variant.product.name}
              </StyledLinkNoDecoration>
              <p className="variant-text">
                {getOrderDetailRequest.data.data.variant.variantAttributes.map((item, index) => {
                  return (
                    <>
                      {index != 0 && <span>/</span>}
                      <span>{item.attributeValue}</span>
                    </>
                  );
                })}
              </p>
            </div>
          </ProductDetail>
        </div>
        <div>
          <h4>Select the return reason</h4>
          <SelectInput
            state={exchangeReason}
            setState={setExchangeReason}
            options={reasonOptions}
          />
        </div>
        <div>
          <h4>Choose the desired solution</h4>
          <SelectInput
            state={exchangeChoice}
            setState={setExchangeChoice}
            options={exchangeOptions}
          />
        </div>
        <Buttons>
          <button onClick={onReturn}>Submit</button>
        </Buttons>
      </Content>
      {success && (
        <SuccessPopUp
          message={"Success. Please wait for response"}
          action={() => {
            setSuccess(false);
            navigtate("/account/order");
          }}
        />
      )}
    </Container>
  );
}
