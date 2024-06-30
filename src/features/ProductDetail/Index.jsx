import styled from "styled-components";
import ProductSingleMain from "./components/ProductSingleMain";
import ProductSingleInformation from "./components/ProductSingleInformation";
import ProductRelated from "./components/ProductRelated";
import { GetProductDetailRequest } from "./api/productDetailApi";
import { useSearchParams } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { GetProductVariantDetailRequest } from "./api/productDetailApi";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductReview from "./components/ProductReview";
import image404 from "./assets/404.png";
import { useNavigate } from "react-router-dom";

const ProductSingleContainer = styled.div`
  max-width: 1280px;
  padding: 15px;
  margin: 0 auto;
`;

const BreadCrumb = styled.div`
  padding: 10px 10px;

  display: flex;
  align-items: center;

  > span {
    color: rgba(0, 0, 0, 0.5);
  }

  > svg {
    margin-right: 5px;
  }
`;

const NoProduct = styled.div`
  margin: 5rem auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  gap: 1rem;

  > p {
    font-size: 15px;
  }

  > button {
    background-color: white;
    color: #0b74e5;
    border-radius: 5px;
    border: 1px solid #0b74e5;
    padding: 8px 8px;
    cursor: pointer;
  }
`;

export default function ProductDetail() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getProductDetailRequest = GetProductDetailRequest(searchParams.get("id"));
  const getProductVariantDetailRequest = GetProductVariantDetailRequest(searchParams.get("id"));

  if (getProductDetailRequest.isLoading || getProductVariantDetailRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (getProductDetailRequest.data.data == null) {
    return (
      <NoProduct>
        <img src={image404} />
        <p>The page you are looking for does not exist</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </NoProduct>
    );
  }

  return (
    <ProductSingleContainer>
      <BreadCrumb>
        <Link>Home</Link> <FaAngleRight /> <Link>Product list</Link> <FaAngleRight />
        <Link>{getProductDetailRequest.data.data.category.name}</Link> <FaAngleRight />
        <Link>{getProductDetailRequest.data.data.name}</Link>
      </BreadCrumb>
      <ProductSingleMain
        data={getProductDetailRequest.data.data}
        variant={getProductVariantDetailRequest.data.data}
        request={getProductDetailRequest}
      />
      <ProductReview data={getProductDetailRequest.data.data} />
      <ProductRelated />
    </ProductSingleContainer>
  );
}
