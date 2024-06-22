import styled from "styled-components"
import CartItem from "./components/cartItem"
import PaymentComponent from "./components/paymentComponent"
import { GetCartByUserIdQuery, GetTotalAmountByCartsIdRequest } from "./api/customerCartApi"
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
  const [listCartsOptions, setListCartsOptions] = useState([])
  const [totalAmount,setTotalAmount] = useState(0);
  const [isCheckedAll,setIsCheckedAll] = useState(false)
  const getTotalAmountByCartsIdRequest = GetTotalAmountByCartsIdRequest();

  useEffect(() => {
    const transformedData = GetCartByUserId?.data?.data.map(item => ({ ...item, isChecked: false }))
    setCarts(transformedData)
  }, [GetCartByUserId.status])

  useEffect(() => {
    var cartsId = [];
    listCartsOptions.map((item) => {
      cartsId.push(item.idCart)
    })
    console.log(cartsId)
    getTotalAmountByCartsIdRequest.mutate(cartsId, {
      onSuccess: (res) => {
        // console.log(res)
        setTotalAmount(res);
      }
    })
    
  }, [listCartsOptions])


  /// dung trong checkAlll
  useEffect(()=>{
      if(!isCheckedAll){
        console.log(listCartsOptions)
        setListCartsOptions([]);
      }
  },[isCheckedAll])

  const setDataFromParent = (childData) => {
    setListCartsOptions(pre => {
      if (pre.some(item => item.idCart == childData.idCart)) {
        return pre.filter(item => item.idCart !== childData.idCart)
      } else {
        return [...pre, childData]
      }
    })
  }

  const configurateDataFromParent = (childData) => {
    const itemExists = listCartsOptions.some(item => item.idCart == childData.idCart)
    if (itemExists) {
      const updateListCartsOption = listCartsOptions.map(item =>{
        if(item.idCart == childData.idCart){
          return {...item,quanity: childData.quanity,totalPrice:childData.totalPrice}
        }
        return item
      })     
      setListCartsOptions(updateListCartsOption)
    } 
  }


  /// dung trong checkAlll
  const handleIsCheckedAll = (event) =>{
    setIsCheckedAll(event.target.checked)
  }

  return (
    <MainStyleComponent>            
      <div className="layout">
        <div className="left-cart">
          {/* <h4>Cart</h4> */}
          <div className="headingDetail">
            <span className="headingDetail-item headingDetail-item1">
              <input type="checkbox" checked={isCheckedAll} onChange={(event) => handleIsCheckedAll(event)}/>
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
                  <CartItem detailCart={cart} setData={setDataFromParent} configurateData={configurateDataFromParent} isCheckedAll={isCheckedAll} />
                </div>
              )
            })
          }
        </div>
        <div className="right-cart">
          <PaymentComponent totalAmount={totalAmount}/>
        </div>
      </div>
    </MainStyleComponent>
  )
}
