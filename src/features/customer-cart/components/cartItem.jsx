import { useEffect, useState } from "react"
import styled from "styled-components"
import { DeleteCartByIdMutation, UpdateCartById, UpdateCartByIdRequest } from "../api/customerCartApi";
import { FaRegTrashAlt } from "react-icons/fa";

const CartItemStyle = styled.div`
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
              .variant-text{
                color: #808089;
              }
            }
            .cart-item2{
              width: 180px;
              font-weight: bolder;
            }
            .cart-item3{
              width: 120px;
              display: flex;
              flex-direction: row;              
              .quanity{
                width: 32px;
                height: 27px;                
              }
            }
            .cart-item4{
              width: 120px;
              font-weight: bolder;
              color: red;
            }
            .cart-item5{
              width: 18px;
              cursor: pointer;
            }
          }
`
export default function CartItem(props) {
  const [idCart, setIdCart] = useState(props?.detailCart?.id);
  const [productName, setProductName] = useState(props?.detailCart?.variant?.product?.name);
  const [price, setPrice] = useState(props?.detailCart?.variant?.price);
  const [salePrice, setSalePrice] = useState(props?.detailCart?.variant?.salePrice);
  const [quanity, setQuanity] = useState(props?.detailCart?.quanity);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableQuanity, setAvailableQuanity] = useState(props?.detailCart?.variant?.availableQuanity);
  // const updateCartByIdRequest = UpdateCartByIdRequest();
  const deleteCartByIdMutation = DeleteCartByIdMutation();

  useEffect(() => {
    // console.log('props', props)     
  }, [props])

  useEffect(() => {
    setTotalPrice(price * quanity)
  }, [])

  const handleQuanity = (operator) => {
    if (operator == "+") {
      UpdateCartById(idCart, quanity + 1).then(
        (res) => {          
          if (res?.data?.isOkay) {                        
            setQuanity(quanity + 1);
            setTotalPrice(res?.data?.total)
          } 
        }
      )
    }
    if (operator == "-") {
      if ((quanity - 1) > 0) {
        UpdateCartById(idCart, quanity - 1).then(
          (res) => {            
            if (res?.data?.isOkay) {              
              setQuanity(quanity - 1);
              setTotalPrice(res?.data?.total)
            }
          }
        )
        // setQuanity(quanity - 1);
      } else {
        setQuanity(1);
      }
    }
  }

  const hanldeInput = (event) => {
    const value = parseInt(event?.target?.value)
    if (Number.isInteger(value) && value > 0) {
      setQuanity(value)
    } else {
      setQuanity(1);
    }
  }

  const onBlurInput = () =>{
      console.log('blur');
      UpdateCartById(idCart,quanity).then(
        (res) =>{
          console.log(res)
          if (res?.data?.isOkay) {                        
            setQuanity(res?.data?.quanity);
            setTotalPrice(res?.data?.total)            
          } 
          if (!res?.data?.isOkay) {           
            setQuanity(res?.data?.quanity);
            setTotalPrice(res?.data?.total)     
          } 
        }
      )
  }
  const deleteCartBtn = () =>{
    deleteCartByIdMutation.mutate({cartId: idCart},{onSuccess: (res)=>{
      alert("asdasd");  
    }});

  }

  return (
    <CartItemStyle>
      <div className="cart-item-container">
        <span className="cart-item1">
          <input type="checkbox" />
          <img src="as/jpg" style={{ width: "50px", height: "50px" }} />
          <div>
            <a>{productName}</a>
            <p className="variant-text">Trắng Đen</p>
          </div>
        </span>
        <span className="cart-item2">
          {
            (salePrice == 0 || salePrice < price) ?
              (<>
                <p className="price">{price}</p>
              </>)
              : (<>
                <p className="price" style={{ textDecoration: "line-through" }}>{salePrice}</p>
                <p className="sale-price" style={{ color: "red" }}>{price}</p>
              </>)
          }
        </span>
        <span className="cart-item3">
          <button onClick={() => handleQuanity("-")}>-</button>
          <input type="text" className="quanity" value={quanity} onChange={(event) => hanldeInput(event)} onBlur={onBlurInput} />
          <button onClick={() => handleQuanity("+")}>+</button>
        </span>
        <span className="cart-item4">{totalPrice ? totalPrice : 0}</span>
        <span className="cart-item5" onClick={deleteCartBtn}><FaRegTrashAlt /></span>
      </div>
    </CartItemStyle>
  )
}