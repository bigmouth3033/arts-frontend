import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Styled components
const ProductSingleContentStyled = styled.section`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  column-gap: 2rem;
  justify-content: center;
  align-items: flex-start;
`;

const ImageContainerStyled = styled.div`
  width: 60%;
`;
const StyledContainerProductView = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  position: relative;
  overflow: hidden;
`;

const ProductSingleImageStyled = styled.div`
  position: relative;
`;

const StyledProductSingleAside = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const ThumbnailImage = styled.img`
  border-radius: 50%;
  width: 5.5rem;
  height: 5.5rem;
  cursor: pointer;
`;

const ProductSingleSummaryStyled = styled.div`
  padding: 1rem 0 0 15px;
  width: 40%;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 530px;
  object-fit: cover;
  border-radius: 2rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const ArrowButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 50%;
  ${(props) => props.disabled && "cursor: not-allowed; opacity: 0.5;"}
`;

const PreviousButton = styled(ArrowButton)``;

const NextButton = styled(ArrowButton)``;

const StyledShippingBoxWrap = styled.div`
  line-height: 2;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  font-size: 14px;
`;
const StyledShippingItem = styled.div`
  border-radius: 10px;
  background-color: #f8f9fa;
  padding: 1rem;
`;
const StyledShippingText = styled.div`
  padding: 0 0.5rem;
`;
// Responsive configuration
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const StyledCarousel = styled.div`
  display: grid;
`;
const StyledProductSingleHeading = styled.div``;
const StyledSingleInfor = styled.div`
  margin-bottom: 0.7rem;
  font-size: 3rem;
`;
const ProductSingleMaptags = styled.p`
  background-color: green;
  margin-bottom: 1rem;
  padding: 0.3rem 0.8rem;
  width: fit-content;
  border-radius: 4px;
`;
const StyledProductSingleAction = styled.div`
  background-color: orange;
  border-radius: 1.3rem;
  margin-bottom: 1rem;
  padding: 0.6rem;
  width: 50%;
`;
const StyledProductSingleFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1.5rem;
  column-gap: 0.5rem;
`;

const StyledProductAddCarts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  cursor: pointer;
`;
const StyledGroupButtonAddCart = styled.div`
  padding: 3px 10px;
  margin: 0 0.5rem;
  border-radius: 1.5rem;
  background-color: white;
  align-items: center;
`;
const StyledButtonAdd = styled.button`
  border: none;
  background: white;
  border-radius: 1.5rem;
`;
const StyledButtonSub = styled.button`
  background: white;
  border-radius: 1.5rem;
  border: none;
`;
const StyledItemFeature = styled.p`
  padding: 0.5rem 0;
`;
const ButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide, totalItems },
  } = rest;
  return (
    <ButtonWrapper>
      <PreviousButton onClick={previous} disabled={currentSlide === 0}>
        <IoIosArrowBack size={30} />
      </PreviousButton>
      <NextButton onClick={next} disabled={currentSlide === totalItems - 1}>
        <IoIosArrowForward size={30} />
      </NextButton>
    </ButtonWrapper>
  );
};

// Main component
export default function ProductSingleMain({ data }) {
  const [quantity, SetQuantity] = useState(1);
  const handleClickSub = (event) => {
    if (quantity <= 1) {
      event.preventDefault();
    } else {
      SetQuantity(quantity - 1);
    }
  };
  const handleClickAdd = (event) => {
    if (quantity >= 50) {
      event.preventDefault();
    } else {
      SetQuantity(quantity + 1);
    }
  };
  return (
    <ProductSingleContentStyled>
      <ImageContainerStyled>
        <StyledContainerProductView>
          <StyledProductSingleAside>
            {data.productImages.map((item) => {
              return <img src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName} />;
            })}
          </StyledProductSingleAside>

          <ProductSingleImageStyled>
            <StyledCarousel>
              <Carousel
                responsive={responsive}
                arrows={false}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
                ssr={true} // means to render carousel on server-side
                infinite={false}
                additionalTransfrom={0}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                swipeable={true}
                showDots={false}
              >
                {data.productImages.map((item) => {
                  return (
                    <div>
                      <CarouselImage src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName} />
                    </div>
                  );
                })}
              </Carousel>
            </StyledCarousel>
          </ProductSingleImageStyled>
        </StyledContainerProductView>
        <StyledShippingBoxWrap>
          <StyledShippingItem>
            <h4>Shipping Fee</h4>
            <StyledShippingText>Ha Noi city - 20.000 USD</StyledShippingText>
            <StyledShippingText>The remaining provinces - 25,000 USD</StyledShippingText>
          </StyledShippingItem>
          <StyledShippingItem>
            <h4>Expected ship time</h4>
            <StyledShippingText>Ha Noi, Ho Chi Minh city: 1-2 days</StyledShippingText>
            <StyledShippingText>The remaining provinces: 3-5 days</StyledShippingText>
          </StyledShippingItem>
        </StyledShippingBoxWrap>
      </ImageContainerStyled>

      <ProductSingleSummaryStyled>
        <StyledProductSingleHeading>
          <h1>{data.name}</h1>
        </StyledProductSingleHeading>
        <StyledSingleInfor>245.000 USD</StyledSingleInfor>

        <ProductSingleMaptags>New</ProductSingleMaptags>

        <StyledProductSingleAction>
          <StyledProductAddCarts>
            <StyledGroupButtonAddCart>
              <StyledButtonSub onClick={handleClickSub}>-</StyledButtonSub>
              <span> {quantity}</span>
              <StyledButtonAdd onClick={handleClickAdd}>+</StyledButtonAdd>
            </StyledGroupButtonAddCart>
            <div>Add to cart</div>
          </StyledProductAddCarts>
        </StyledProductSingleAction>
        <hr />
        <StyledProductSingleFeatures>
          <StyledItemFeature>
            <span>✨</span> Avocado oil provides nutrients to the hair
          </StyledItemFeature>
          <StyledItemFeature>
            <span>✨</span> Hydrolysis keratin prevents and restores damage
          </StyledItemFeature>
          <StyledItemFeature>
            <span>✨</span> Rapesia producing oil to protect hair strands
          </StyledItemFeature>
          <StyledItemFeature>
            <span>🚫</span> Does not contain sulfate, silicone and paraben
          </StyledItemFeature>
        </StyledProductSingleFeatures>
      </ProductSingleSummaryStyled>
    </ProductSingleContentStyled>
  );
}
