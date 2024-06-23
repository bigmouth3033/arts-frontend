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

const ProductSingleContainer = styled.div`
  max-width: 1230px;
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

export default function ProductDetail() {
  let [searchParams, setSearchParams] = useSearchParams();

  const getProductDetailRequest = GetProductDetailRequest(searchParams.get("id"));
  const getProductVariantDetailRequest = GetProductVariantDetailRequest(searchParams.get("id"));

  if (getProductDetailRequest.isLoading || getProductVariantDetailRequest.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <ProductSingleContainer>
      <BreadCrumb>
        <Link>Home</Link> <FaAngleRight /> <Link>Product list</Link> <FaAngleRight />
        <Link>{getProductDetailRequest.data.data.category.name}</Link> <FaAngleRight />
        <Link>{getProductDetailRequest.data.data.name}</Link>
      </BreadCrumb>
      <
      <ProductSingleMain
        data={getProductDetailRequest.data.data}
        variant={getProductVariantDetailRequest.data.data}
      />

      <ProductRelated />
    </ProductSingleContainer>
  );
}
