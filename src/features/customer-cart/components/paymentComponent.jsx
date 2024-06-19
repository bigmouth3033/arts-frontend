import styled from "styled-components"

const PaymentComponentStyle = styled.div`
    background-color: #efefef;
    height: 100%;    
    padding-top: 20px;
    .price-summary{
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        margin-bottom: 20px;
        border-radius: 4px;
        .price-item{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 20px;
            border: solid thin #efefef;
        }
        .price-total{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 20px;
        }
    }
    .btn-order{
        width: 100%;
        background-color: #ff424E;
        input {border:0;outline:0;}
        input:focus {outline:none!important;}
    }
`

export default function PaymentComponent() {
    return (
        <PaymentComponentStyle>
            <div className="price-summary">
                <div className="price-item">
                    <span>Tạm tính</span>
                    <span>555.555.555d</span>
                </div>
                <div className="price-total">
                    <span>Tổng tiền</span>
                    <span>555.555.555d</span>
                </div>
            </div>
            <button className="btn-order">Mua Hàng</button>
        </PaymentComponentStyle>
    )
}