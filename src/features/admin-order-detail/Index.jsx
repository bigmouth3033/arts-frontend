import styled from "styled-components";
import { useState } from "react";
import { GetOrderByIdRequest } from "./api/adminOrderDetailApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import Avatar from "react-avatar";
import dchc from "@/shared/data/dchc";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import formatDollar from "@/shared/utils/FormatDollar";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 75rem;
  margin: auto;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 14px;

  > h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  * hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  & h5,
  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 3rem;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Right = styled.div`
  > div {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
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
`;

const Image = styled.div`
  width: 5rem;
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

const CustomerInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;

  padding: 10px 0;

  > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 1rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
    border-radius: 5px;
  }

  & p {
    color: rgba(0, 0, 0, 0.8);

    > span {
      font-weight: 600;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export default function AdminOrderDetail() {
  const getOrderByIdRequest = GetOrderByIdRequest(13);

  if (getOrderByIdRequest.isLoading) {
    return <WaitingPopUp />;
  }

  const getAddress = (address) => {
    const province = dchc.data.find((item) => item.level1_id == address.province);
    const district = province.level2s.find((item) => item.level2_id == address.district);
    const ward = district.level3s.find((item) => item.level3_id == address.ward);

    return `${province.name}, ${district.name}, ${ward.name}, ${address.addressDetail}`;
  };

  return (
    <Container>
      <Content>
        <Left>
          <CustomerInfo>
            <div>
              <h4>Customer Information</h4>
              <div>
                <p>
                  <span>Name</span>: {getOrderByIdRequest.data.data.user.fullname}
                </p>
                <p>
                  <span>Email</span>: {getOrderByIdRequest.data.data.user.email}
                </p>
                <p>
                  <span>Phone number</span>: {getOrderByIdRequest.data.data.user.phoneNumber}
                </p>
              </div>
            </div>
            <div>
              <h4>Delivery Address</h4>
              <div>
                <p>
                  <span>Name</span>: {getOrderByIdRequest.data.data.payment.address.fullName}
                </p>
                <p>
                  <span>Phone number</span>:{" "}
                  {getOrderByIdRequest.data.data.payment.address.phoneNumber}
                </p>
                <p>
                  <span>Address</span>: {getAddress(getOrderByIdRequest.data.data.payment.address)}
                </p>
              </div>
            </div>
          </CustomerInfo>
          <div>
            <TableContent>
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>PRODUCT</th>
                  <th>DELIVERY</th>
                  <th>PAYMENT TYPE</th>
                  <th>PRICE</th>
                  <th>QUANTIY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {convertToLetterString(
                      getOrderByIdRequest.data.data.payment.deliveryType.id,
                      1
                    ) +
                      convertToLetterString(
                        getOrderByIdRequest.data.data.variant.product.categoryId,
                        2
                      ) +
                      convertToLetterString(getOrderByIdRequest.data.data.variant.id, 5) +
                      convertToLetterString(getOrderByIdRequest.data.data.id, 8)}
                  </td>
                  <td className="product-detail">
                    <Image>
                      <img
                        src={
                          import.meta.env.VITE_API_IMAGE_PATH +
                          (getOrderByIdRequest.data.data.variant.variantImage
                            ? getOrderByIdRequest.data.data.variant.variantImage
                            : getOrderByIdRequest.data.data.variant.product.productImages[0]
                                .imageName)
                        }
                      />
                    </Image>

                    <div>
                      <StyledLink
                        to={`/productdetail?id=${getOrderByIdRequest.data.data.variant.product.id}`}
                      >
                        {getOrderByIdRequest.data.data.variant.product.name}
                      </StyledLink>
                      <p className="variant-text">
                        {getOrderByIdRequest.data.data.variant.variantAttributes.map(
                          (item, index) => {
                            return (
                              <>
                                {index != 0 && <span>/</span>}
                                <span>{item.attributeValue}</span>
                              </>
                            );
                          }
                        )}
                      </p>
                    </div>
                  </td>
                  <td>{getOrderByIdRequest.data.data.payment.deliveryType.name}</td>
                  <td>{getOrderByIdRequest.data.data.payment.paymentType.name}</td>
                  <td>
                    $
                    {formatDollar(
                      getOrderByIdRequest.data.data.totalPrice /
                        getOrderByIdRequest.data.data.quanity
                    )}
                  </td>
                  <td>{getOrderByIdRequest.data.data.quanity}</td>
                  <td>${formatDollar(getOrderByIdRequest.data.data.totalPrice)}</td>
                </tr>
              </tbody>
            </TableContent>
          </div>
        </Left>
        <Right>
          <div>
            <h4>Order Progress</h4>
          </div>
        </Right>
      </Content>
    </Container>
  );
}
