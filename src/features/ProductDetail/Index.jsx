import styled from "styled-components";
import ProductSingleMain from "./components/ProductSingleMain";
import ProductSingleInformation from "./components/ProductSingleInformation";
import ProductRelated from "./components/ProductRelated";
import { GetProductDetailRequest } from "./api/productDetailApi";
import { useSearchParams } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";

const ProductSingleContainer = styled.div`
  max-width: 1230px;
  margin: 0 auto;
`;
export default function ProductDetail() {
  let [searchParams, setSearchParams] = useSearchParams();

  const getProductDetailRequest = GetProductDetailRequest(searchParams.get("id"));

  if (getProductDetailRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (getProductDetailRequest.isSuccess) {
    return (
      <ProductSingleContainer>
        <ProductSingleMain data={getProductDetailRequest.data.data} />
        <ProductSingleInformation data={getProductDetailRequest.data.data} />
        <ProductRelated />
      </ProductSingleContainer>
    );
  }
}
