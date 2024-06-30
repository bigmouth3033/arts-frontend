import { useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { GetOrderDetailRequest } from "./api/orderDetailApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import formatDollar from "@/shared/utils/FormatDollar";
import { ProgressBar } from "react-step-progress-bar";
import { Step } from "react-step-progress-bar";
import "./assets/css/progress.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoThumbsup } from "react-icons/go";
import { CiTimer } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import dchc from "@/shared/data/dchc";
import { Link } from "react-router-dom";
import React from "react";
import { CreateCartItemRequest } from "../ProductDetail/api/productDetailApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import { useQueryClient } from "@tanstack/react-query";
import { RiExchangeDollarFill } from "react-icons/ri";
import CancelPopUp from "./components/CancelPopUp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h3 {
    font-size: 20px;
    font-weight: 100;
  }
`;

const TableContent = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  width: 100%;

  overflow: hidden;

  thead tr {
    background-color: #0091ea;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & td > button {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  & .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    > button {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      padding: 5px;
      border-radius: 5px;

      &:hover {
        color: red;
      }
    }
  }
  & tbody {
    background-color: white;
  }

  & .action {
    text-align: center;
  }

  & .product-detail {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    & .variant-text {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.4);
    }
  }

  & .exchange {
    display: flex;
    background-color: #ffe880;
    width: fit-content;
    align-items: center;
    gap: 3px;
    color: #0a68ff;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 25px;
    font-size: 12px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Progress = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;

  padding: 1rem;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > h4 {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.5);
    }

    > div {
      background-color: white;
      padding: 10px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
      min-height: 9rem;

      & h4 {
        margin-bottom: 10px;
        font-weight: 600;
        color: #000;
      }
    }
  }
`;

const Image = styled.div`
  width: 10rem !important;
  height: 5rem;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const ProgressDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: rgba(0, 0, 0, 0.6);
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

const Product = styled.div``;

export default function AccountOrderDetail() {
  let [searchParams, setSearchParams] = useSearchParams();
  const createCartItemRequest = CreateCartItemRequest();
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartError, setCartError] = useState(false);
  const queryClient = useQueryClient();
  const [cancelPopUp, setCancelPopUp] = useState(false);

  const getOrderDetailRequest = GetOrderDetailRequest(searchParams.get("id"));

  if (getOrderDetailRequest.isLoading) {
    return <WaitingPopUp />;
  }

  const getAddress = (address) => {
    const province = dchc.data.find((item) => item.level1_id == address.province);
    const district = province.level2s.find((item) => item.level2_id == address.district);
    const ward = district.level3s.find((item) => item.level3_id == address.ward);

    return `${province.name}, ${district.name}, ${ward.name}, ${address.addressDetail}`;
  };

  const percent = (status) => {
    if (status == "Pending") {
      return 0;
    }

    if (status == "Accepted") {
      return 34;
    }

    if (status == "Delivery") {
      return 67;
    }

    if (status == "Success") {
      return 100;
    }
  };

  const onAddToCart = (variant) => {
    const formData = new FormData();
    formData.append("VariantId", variant.id);
    formData.append("Quantity", 1);
    createCartItemRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 201) {
          setCartSuccess(true);
          queryClient.invalidateQueries({ queryKey: ["cart-quantity"] });
          queryClient.invalidateQueries({ queryKey: ["user-cart"] });
          return;
        }

        if (response.status == 405) {
          setErrorMessage(`The remaining quantity of this product is ${response.data.quanity}.`);
          setCartError(true);
          request.refetch();
        }
      },
      onError: (response) => {},
    });
  };

  const checkValidExchange = (date) => {
    const successDate = new Date(date);

    const timeSpan = successDate - Date.now();

    if (timeSpan <= 604800000) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <h3>
        Order Detail #
        {convertToLetterString(getOrderDetailRequest.data.data.payment.deliveryType.id, 1) +
          convertToLetterString(getOrderDetailRequest.data.data.variant.product.categoryId, 2) +
          convertToLetterString(getOrderDetailRequest.data.data.variant.id, 5) +
          convertToLetterString(getOrderDetailRequest.data.data.id, 8)}
        -{" "}
        {getOrderDetailRequest.data.data.isCancel
          ? "Order Cancel"
          : getOrderDetailRequest.data.data.refund == null
          ? getOrderDetailRequest.data.data.orderStatusType.name
          : getOrderDetailRequest.data.data.refund.status + " refund"}
      </h3>
      <Content>
        {getOrderDetailRequest.data.data.orderStatusType.name != "Denied" &&
          getOrderDetailRequest.data.data.isCancel == false && (
            <Progress>
              <ProgressBar percent={percent(getOrderDetailRequest.data.data.orderStatusType.name)}>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <CiTimer key={index} size={"1.3rem"} />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <FaCheck key={index} />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <CiDeliveryTruck key={index} size={"1.3rem"} />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <GoThumbsup key={index} size={"1.3rem"} />
                    </div>
                  )}
                </Step>
              </ProgressBar>
              <ProgressDetail>
                <div>
                  <p>Order Pending</p>
                </div>
                <div>
                  <p>Order Accepted</p>
                </div>
                <div>
                  <p>Order Delivery</p>
                </div>
                <div>
                  <p>Order Success</p>
                </div>
              </ProgressDetail>
            </Progress>
          )}
        <Info>
          <div>
            <h4>Customer Information</h4>
            <div>
              <h4>{getOrderDetailRequest.data.data.user.fullname}</h4>
              <p>Email: {getOrderDetailRequest.data.data.user.email}</p>
              <p>Phone number: {getOrderDetailRequest.data.data.user.phoneNumber}</p>
            </div>
          </div>
          <div>
            <h4>Delivery Address</h4>
            <div>
              <h4>{getOrderDetailRequest.data.data.payment.address.fullName}</h4>
              <p>Address: {getAddress(getOrderDetailRequest.data.data.payment.address)}</p>
              <p>Phone number: {getOrderDetailRequest.data.data.payment.address.phoneNumber}</p>
            </div>
          </div>
          <div>
            <h4>Payment type</h4>
            <div>
              <p>Pay by {getOrderDetailRequest.data.data.payment.paymentType.name}</p>
            </div>
          </div>
          {getOrderDetailRequest.data.data.isCancel && (
            <div>
              <h4>Cancel Reason</h4>
              <div>{getOrderDetailRequest.data.data.cancelReason}</div>
            </div>
          )}
          {getOrderDetailRequest.data.data.refund != null && (
            <div>
              <h4>Refund Request</h4>
              <div>Request: {getOrderDetailRequest.data.data.refund.reasonRefund}</div>
            </div>
          )}
        </Info>
        <Product>
          <TableContent>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>DELIVERY</th>
                <th>PRICE</th>
                <th>QUANTIY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="product-detail">
                  <Image>
                    <img
                      src={
                        import.meta.env.VITE_API_IMAGE_PATH +
                        (getOrderDetailRequest.data.data.variant.variantImage
                          ? getOrderDetailRequest.data.data.variant.variantImage
                          : getOrderDetailRequest.data.data.variant.product.productImages[0]
                              .imageName)
                      }
                    />
                  </Image>

                  <div>
                    <StyledLink
                      to={`/productdetail?id=${getOrderDetailRequest.data.data.variant.product.id}`}
                    >
                      {getOrderDetailRequest.data.data.variant.product.name}
                    </StyledLink>
                    <p className="variant-text">
                      {getOrderDetailRequest.data.data.variant.variantAttributes.map(
                        (item, index) => {
                          return (
                            <React.Fragment key={index}>
                              {index != 0 && <span>/</span>}
                              <span>{item.attributeValue}</span>
                            </React.Fragment>
                          );
                        }
                      )}
                    </p>
                    {getOrderDetailRequest.data.data.orderStatusId == 16 &&
                      getOrderDetailRequest.data.data.refund == null &&
                      checkValidExchange(getOrderDetailRequest.data.data.updatedAt) && (
                        <p className="exchange">
                          <RiExchangeDollarFill size={"1rem"} /> Exchangable in 7 days
                        </p>
                      )}
                    {getOrderDetailRequest.data.data.orderStatusType.id == 13 &&
                      getOrderDetailRequest.data.data.isCancel == false && (
                        <p className="exchange">Cancelable</p>
                      )}
                  </div>
                </td>
                <td>{getOrderDetailRequest.data.data.payment.deliveryType.name}</td>

                <td>
                  $
                  {formatDollar(
                    getOrderDetailRequest.data.data.totalPrice /
                      getOrderDetailRequest.data.data.quanity
                  )}
                </td>
                <td>{getOrderDetailRequest.data.data.quanity}</td>
                <td>${formatDollar(getOrderDetailRequest.data.data.totalPrice)}</td>
              </tr>
            </tbody>
          </TableContent>
          <Buttons>
            {getOrderDetailRequest.data.data.orderStatusId == 13 &&
              getOrderDetailRequest.data.data.isCancel == false && (
                <button onClick={() => setCancelPopUp(true)}>Request Cancel</button>
              )}
            {getOrderDetailRequest.data.data.orderStatusId == 16 &&
              getOrderDetailRequest.data.data.refund == null &&
              checkValidExchange(getOrderDetailRequest.data.data.updatedAt) && (
                <button>Request Exchange</button>
              )}
            {getOrderDetailRequest.data.data.variant.availableQuanity > 0 && (
              <button onClick={() => onAddToCart(getOrderDetailRequest.data.data.variant)}>
                Re Purchase
              </button>
            )}
          </Buttons>
        </Product>
      </Content>
      {cartSuccess && (
        <SuccessPopUp
          action={() => setCartSuccess(false)}
          header={"Success add to Cart"}
          message={"Please check you cart "}
        />
      )}
      {cartError && (
        <AlertPopUp action={() => setCartError(false)} header={"Error"} message={errorMessage} />
      )}
      {cancelPopUp && (
        <CancelPopUp action={() => setCancelPopUp(false)} order={getOrderDetailRequest} />
      )}
    </Container>
  );
}