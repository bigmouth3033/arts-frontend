import styled from "styled-components";
import ProductSingleMain from "./components/ProductSingleMain";
import ProductSingleInformation from "./components/ProductSingleInformation";
import ProductRelated from "./components/ProductRelated";
import { GetProductDetailRequest } from "./api/productDetailApi";
import { useSearchParams } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { GetProductVariantDetailRequest } from "./api/productDetailApi";

const ProductSingleContainer = styled.div`
  max-width: 1230px;
  margin: 0 auto;
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
      <ProductSingleMain
        data={getProductDetailRequest.data.data}
        variant={getProductVariantDetailRequest.data.data}
      />
      <ProductSingleInformation data={getProductDetailRequest.data.data} />
      <ProductRelated />
    </ProductSingleContainer>
  );
}
