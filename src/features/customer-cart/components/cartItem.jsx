import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DeleteCartByIdMutation,
  PutCartCheckedByIdMutate,
  UpdateCartById,
  UpdateCartByIdRequest,
} from "../api/customerCartApi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CartItemStyle = styled.div`
  padding: 1rem 0;

  .cart-item-container {
    display: grid;
    grid-template-columns: auto 3fr 1fr 1fr 1fr 1fr;
    align-items: center;
    column-gap: 5px;
    padding: 8px 16px;

    .cart-item1 {
      display: grid;
      grid-template-columns: 5rem 1fr;
      align-items: center;
      column-gap: 5px;

      .variant-text {
        color: #808089;
      }
    }

    .cart-item2 {
      display: flex;
      justify-content: center;
      font-weight: bolder;
    }

    .cart-item3 {
      display: flex;
      gap: 1px;

      > button {
        background-color: white;
        border: 1px solid rgba(0, 0, 0);
      }
      .quanity {
        width: 32px;
        height: 27px;
      }
    }

    .cart-item4 {
      display: flex;
      justify-content: center;
      font-weight: bolder;
      color: red;
    }
    .cart-item5 {
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
      text-align: right;
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
`;

export default function CartItem(props) {
  const variant = props.detailCart.variant;

  const [idCart, setIdCart] = useState(props?.detailCart?.id);
  const [productName, setProductName] = useState(props?.detailCart?.variant?.product?.name);
  const [price, setPrice] = useState(props?.detailCart?.variant?.price);
  const [salePrice, setSalePrice] = useState(props?.detailCart?.variant?.salePrice);
  const [quanity, setQuanity] = useState(props?.detailCart?.quanity);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableQuanity, setAvailableQuanity] = useState(
    props?.detailCart?.variant?.availableQuanity
  );
  const [isChecked, setIsChecked] = useState(props?.detailCart?.isChecked);
  const updateCartByIdRequest = UpdateCartByIdRequest();
  const deleteCartByIdMutation = DeleteCartByIdMutation();
  const putCartCheckedByIdMutate  = PutCartCheckedByIdMutate();
  const queryClient = useQueryClient()
 
  useEffect(() => {
    setTotalPrice(price * quanity);
  }, []);

  const handleQuanity = (operator) => {
    if (operator == "+") {
      UpdateCartById(idCart, quanity + 1).then((res) => {
        if (res?.data?.isOkay) {
          setQuanity(quanity + 1);
          setTotalPrice(res?.data?.total);
          queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })
        }
        if (!res?.data?.isOkay) {
          setQuanity(res?.data?.quanity);
          setTotalPrice(res?.data?.total);
          queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })          
        }
      });

    }
    if (operator == "-") {
      if (quanity - 1 > 0) {
        UpdateCartById(idCart, quanity - 1).then((res) => {
          if (res?.data?.isOkay) {
            setQuanity(quanity - 1);
            setTotalPrice(res?.data?.total);
            queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })
          }
        });        
      } else {
        setQuanity(1);
      }
    }
  };

  const hanldeInput = (event) => {
    const value = parseInt(event?.target?.value);
    if (Number.isInteger(value) && value > 0) {
      setQuanity(value);
    } else {
      setQuanity(1);
    }
  };

  const onBlurInput = () => {
    UpdateCartById(idCart, quanity).then((res) => {
      console.log(res);
      if (res?.data?.isOkay) {
        setQuanity(res?.data?.quanity);
        setTotalPrice(res?.data?.total);
        queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })
      }
      if (!res?.data?.isOkay) {
        setQuanity(res?.data?.quanity);
        setTotalPrice(res?.data?.total);
        queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })
      }
    });
  };
  const deleteCartBtn = () => {
    deleteCartByIdMutation.mutate(
      { cartId: idCart },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ['user-cart'] })
          queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })
          alert("asdasd");
        },
      }
    );
  };  

    const handleCheck =(event) =>{
        const formData = new FormData()
        formData.append('cartId',idCart)
        formData.append('isCheckedState',event.target.checked)
        putCartCheckedByIdMutate.mutate(formData,{
          onSuccess: (res) =>{
            console.log(res);
            queryClient.invalidateQueries({ queryKey: ['user-cart'] }) 
            queryClient.invalidateQueries({ queryKey: ['cart-totalAmount'] })
          }
        })
    }

  return (
    <CartItemStyle>
      <div className="cart-item-container">
        <InputCheckBox checked={props?.detailCart?.isChecked} onChange={(event) => handleCheck(event)} />
        <div className="cart-item1">
          <Image>
            <img
              src={
                import.meta.env.VITE_API_IMAGE_PATH +
                (variant.variantImage
                  ? variant.variantImage
                  : variant.product.productImages[0].imageName)
              }
            />
          </Image>

          <div>
            <StyledLink>{productName}</StyledLink>
            <p className="variant-text">
              {variant.variantAttributes.map((item, index) => {
                return (
                  <>
                    {index != 0 && <span>/</span>}
                    <span>{item.attributeValue}</span>
                  </>
                );
              })}
            </p>
          </div>
        </div>

        <span className="cart-item2">
          <p className="price">{price}</p>
        </span>
        <span className="cart-item3">
          <button onClick={() => handleQuanity("-")}>-</button>
          <input
            type="text"
            className="quanity"
            value={quanity}
            onChange={(event) => hanldeInput(event)}
            onBlur={onBlurInput}
          />
          <button onClick={() => handleQuanity("+")}>+</button>
        </span>
        <span className="cart-item4">{totalPrice ? totalPrice : 0}</span>
        <span className="cart-item5" onClick={deleteCartBtn}>
          <FaRegTrashAlt />
        </span>
      </div>
    </CartItemStyle>
  );
}
