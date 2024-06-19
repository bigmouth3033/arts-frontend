import styled from "styled-components"
import CartItem from "./components/cartItem"
import PaymentComponent from "./components/paymentComponent"
import { GetCartByUserIdQuery } from "./api/customerCartApi"
import { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa";



const MainStyleComponent = styled.div`
        background-color: #efefef;
        .layout{
        display: flex;
        flex-direction: row;          
        max-width: 1440px;       
        margin: auto;        
        }
        .left-cart {
          flex: 3;        
          padding  : 20px;
          .headingDetail {            
            display: flex;
            flex-direction: row;       
            padding: 8px 16px; 
            border-radius: 4px;
            align-items: center;
            justify-content: space-between;                
            background-color: #ffffff;
            margin-bottom: 10px;
            &-item1{
              width: 324px;
            }
            &-item2{
              width: 180px;
            }
            &-item3{
              width: 120px;
            }
            &-item4{
              width: 120px;
            }
            &-item5{
              width: 18px;
            }            
          }       
          .cart-item-container{
            display: flex;
            flex-direction: row;
            padding: 8px 16px; 
            border-radius: 4px;
            align-items: center;
            justify-content: space-between;   
            background-color: #ffffff; 
            .cart-item1{
              display: flex;
              flex-direction: row;
              width: 324px;
            }
            .cart-item2{
              width: 180px;
              font-weight: bolder;
            }
            .cart-item3{
              width: 120px;
            }
            .cart-item4{
              width: 120px;
              font-weight: bolder;
              color: red;
            }
            .cart-item5{
              width: 18px;
            }
          }
        }

        .right-cart{
          flex: 1;
        } 
`

export default function Cart() {
  const GetCartByUserId = GetCartByUserIdQuery();
  const [carts, setCarts] = useState();
  useEffect(() => {
    // console.log(GetCartByUserId.data);
    setCarts(GetCartByUserId?.data?.data)
  }, [GetCartByUserId.status, carts])



  return (
    <MainStyleComponent>
      <div className="layout">
        <div className="left-cart">
          {/* <h4>Cart</h4> */}
          <div className="headingDetail">
            <span className="headingDetail-item headingDetail-item1">
              <input type="checkbox" />
              Tất cả
            </span>
            <span className="headingDetail-item item headingDetail-item2">Đơn giá</span>
            <span className="headingDetail-item item headingDetail-item3">Số lượng</span>
            <span className="headingDetail-item item headingDetail-item4">Thành tiền</span>
            <span className="headingDetail-item item headingDetail-item5"><FaRegTrashAlt /></span>
          </div>
          {
            carts?.map((cart) => {              
              return (
                <div key={cart?.id}>
                  <CartItem  detailCart={cart}/>
                </div>
              )
            })
          }
        </div>
        <div className="right-cart">
          <PaymentComponent />
        </div>
      </div>
    </MainStyleComponent>
  )
}
