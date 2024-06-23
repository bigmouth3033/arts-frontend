import styled from "styled-components";
import CartItem from "./components/cartItem";
import PaymentComponent from "./components/paymentComponent";
import { GetCartByUserIdQuery, GetTotalAmountByCartsIdRequest } from "./api/customerCartApi";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";

const MainStyleComponent = styled.div`
  max-width: 1280px;
  padding: 15px;
  margin: 0 auto;

  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .left-cart {
    padding: 20px;

    .headingDetail {
      display: grid;
      grid-template-columns: auto 3fr 1fr 1fr 1fr 1fr;
      column-gap: 5px;
      padding: 8px 16px;

      background-color: #ffffff;
      margin-bottom: 10px;
    }
  }
`;

const CartItemContainer = styled.div`
  background-color: white;
`;

export default function Cart() {
  const GetCartByUserId = GetCartByUserIdQuery();
  const [carts, setCarts] = useState();
  const [listCartsOptions, setListCartsOptions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const getTotalAmountByCartsIdRequest = GetTotalAmountByCartsIdRequest();

  useEffect(() => {
    const transformedData = GetCartByUserId?.data?.data.map((item) => ({
      ...item,
      isChecked: false,
    }));
    setCarts(transformedData);
  }, [GetCartByUserId.status]);

  useEffect(() => {
    var cartsId = [];
    listCartsOptions.map((item) => {
      cartsId.push(item.idCart);
    });
    console.log(cartsId);
    getTotalAmountByCartsIdRequest.mutate(cartsId, {
      onSuccess: (res) => {
        // console.log(res)
        setTotalAmount(res);
      },
    });
  }, [listCartsOptions]);

  /// dung trong checkAlll
  useEffect(() => {
    if (!isCheckedAll) {
      console.log(listCartsOptions);
      setListCartsOptions([]);
    }
  }, [isCheckedAll]);

  const setDataFromParent = (childData) => {
    setListCartsOptions((pre) => {
      if (pre.some((item) => item.idCart == childData.idCart)) {
        return pre.filter((item) => item.idCart !== childData.idCart);
      } else {
        return [...pre, childData];
      }
    });
  };

  const configurateDataFromParent = (childData) => {
    const itemExists = listCartsOptions.some((item) => item.idCart == childData.idCart);
    if (itemExists) {
      const updateListCartsOption = listCartsOptions.map((item) => {
        if (item.idCart == childData.idCart) {
          return { ...item, quanity: childData.quanity, totalPrice: childData.totalPrice };
        }
        return item;
      });
      setListCartsOptions(updateListCartsOption);
    }
  };

  /// dung trong checkAlll
  const handleIsCheckedAll = (event) => {
    setIsCheckedAll(event.target.checked);
  };

  if (GetCartByUserId.isLoading || getTotalAmountByCartsIdRequest.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <MainStyleComponent>
      <div className="layout">
        <div className="left-cart">
          <div className="headingDetail">
            <span className="headingDetail-item headingDetail-item1">
              <InputCheckBox
                checked={isCheckedAll}
                onChange={(event) => handleIsCheckedAll(event)}
              />
            </span>
            <span> Total</span>
            <span className="headingDetail-item item headingDetail-item2">Unit price</span>
            <span className="headingDetail-item item headingDetail-item3">Quantity</span>
            <span className="headingDetail-item item headingDetail-item4">Total Amount</span>
            <span className="headingDetail-item item headingDetail-item5">
              <FaRegTrashAlt />
            </span>
          </div>
          {carts?.map((cart) => {
            return (
              <CartItemContainer key={cart?.id}>
                <CartItem
                  detailCart={cart}
                  setData={setDataFromParent}
                  configurateData={configurateDataFromParent}
                  isCheckedAll={isCheckedAll}
                />
              </CartItemContainer>
            );
          })}
        </div>
        <div className="right-cart">
          <PaymentComponent totalAmount={totalAmount} />
        </div>
      </div>
    </MainStyleComponent>
  );
}
