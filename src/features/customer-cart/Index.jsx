import styled from "styled-components";
import CartItem from "./components/cartItem";
import PaymentComponent from "./components/paymentComponent";
import { GetCartByUserIdQuery, GetTotalAmountByUserIdQuery, PutAllCartCheckedMutate } from "./api/customerCartApi";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  const [carts, setCarts] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const GetCartByUserId = GetCartByUserIdQuery();
  const putAllCartCheckedMutate = PutAllCartCheckedMutate();
  const getTotalAmountByUserIdQuery = GetTotalAmountByUserIdQuery()
  const queryClient = useQueryClient()


  useEffect(() => {
    console.log('get api', GetCartByUserId?.data?.data)    
    console.log(getTotalAmountByUserIdQuery?.data?.data)
  }, [GetCartByUserId.status,getTotalAmountByUserIdQuery.status]);

  
  const handleIsCheckedAll = (event) => {
    setIsCheckedAll(event.target.checked);
    const formData = new FormData()
    formData.append('isCheckedState', event.target.checked);
    putAllCartCheckedMutate.mutate(formData, {
      onSuccess: (res) => {
        console.log(res)
        queryClient.invalidateQueries({ queryKey: ['user-cart'] })
        queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })
      }
    })
  };

  if (GetCartByUserId.isLoading) {
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
          {GetCartByUserId?.data?.data.map((cart) => {
            return (
              <CartItemContainer key={cart?.id}>
                <CartItem
                  detailCart={cart}
                  isCheckedAll={isCheckedAll}
                />
              </CartItemContainer>
            );
          })}
        </div>
        <div className="right-cart">
          <PaymentComponent totalAmount={getTotalAmountByUserIdQuery?.data?.data} />
        </div>
      </div>
    </MainStyleComponent>
  );
}
