import React from "react";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../assets/embla.css";
import ProductSingleInformation from "./ProductSingleInformation";
import { FaDollarSign } from "react-icons/fa6";
import convertToLetterString from "../utils/convertIdToStr";

const Container = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 4fr 6fr;
  align-items: flex-start;
  gap: 1rem;
`;

const Images = styled.div`
  padding: 1rem;
  border-radius: 5px;
  background-color: white;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    padding: 1rem;
    background-color: white;
  }
`;

const ProductName = styled.h4`
  font-size: 1rem;
`;

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Variant = styled.button`
  background-color: white;
  padding: 5px 2rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  color: rgba(0, 0, 0, 0.8);

  border: ${(props) =>
    props.$active ? "2px solid #0057A0" : "2px solid rgba(0,0,0,0)"};
`;

const VariantContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const LeftDetail = styled.div`
  position: sticky;
  top: 10px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Payment = styled.div`
  background-color: white;
`;

const StyledShippingBoxWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`;

const Prices = styled.div`
  display: flex;
  align-items: last baseline;
  gap: 1rem;

  > h4 {
    display: flex;
    align-items: flex-start;
  }

  > h4:nth-of-type(1) {
    font-size: 2.2rem;

    > svg {
      font-size: 15px;
    }
  }

  > h4:nth-of-type(2) {
    font-size: 1.4rem;
    font-weight: 100;
    text-decoration: line-through;

    > svg {
      font-size: 15px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledProductSingleAction = styled.div`
  background-color: orange;
  border-radius: 1.3rem;
  margin-bottom: 1rem;
  padding: 0.6rem;
  width: fit-content;
  transition: background-color 0.5s;

  &:hover {
    background-color: #e47c21;
  }
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
  display: flex;
  align-items: center;
  gap: 10px;

  > span {
    width: 10px;
  }
`;

const OutOfStock = styled.h4`
  font-size: 20px;
`;

const StyledButtonAdd = styled.button`
  border: none;
  background: white;
  border-radius: 1.5rem;
  cursor: pointer;
  font-size: 1rem;
`;
const StyledButtonSub = styled.button`
  background: white;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: inherit;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

export default function ProductSingleMain({ data, variant }) {
  const OPTIONS = {};
  const SLIDES = data.productImages;

  const [quantity, setQuantity] = useState(0);
  const [first, setFirst] = useState(variant[0] && 0);
  const [second, setSecond] = useState(variant[1] && 0);
  const [third, setThird] = useState(variant[2] && 0);

  const onClickVariant = (index, i) => {
    if (index == 0) {
      setFirst(i);
    }

    if (index == 1) {
      setSecond(i);
    }

    if (index == 2) {
      setThird(i);
    }
  };

  const onActive = (index, i) => {
    if (index == 0) {
      return i == first;
    }

    if (index == 1) {
      return i == second;
    }

    if (index == 2) {
      return i == third;
    }
  };

  const onGetVariant = () => {
    return data.variants.find((item) => {
      if (first != null) {
        return (
          item.variantAttributes[0].attributeValue == variant[0].values[first]
        );
      }

      if (second != null) {
        return (
          item.variantAttributes[0].attributeValue ==
            variant[0].values[first] &&
          item.variantAttributes[1].attributeValue == variant[1].values[second]
        );
      }

      if (third != null) {
        return (
          item.variantAttributes[0].attributeValue ==
            variant[0].values[first] &&
          item.variantAttributes[1].attributeValue ==
            variant[1].values[second] &&
          item.variantAttributes[2].attributeValue == variant[2].values[third]
        );
      }
    });
  };

  const onClickAddQuantity = () => {
    const variant = onGetVariant();

    setQuantity((prev) => {
      if (prev + 1 > variant.quanity) {
        return variant.quanity;
      }
      return prev + 1;
    });
  };

  const onClickSubQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };
const handleClickRating  = ()=>{
  
}
  useEffect(() => {
    setQuantity(1);
  }, [first, second, third]);

  return (
    <Container>
      <div>
        <LeftDetail>
          <Images>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </Images>
        </LeftDetail>
        <div>
          <button onClick={handleClickRating}>Rating</button>
        </div>
      </div>
      <Detail>
        <Header>
          <div>
            <span>
              ID:
              {convertToLetterString(data.categoryId, 2) +
                convertToLetterString(data.id, 5)}
            </span>
          </div>
          <h3>{data.name}</h3>
          <div></div>
          <Prices>
            <h4>
              <FaDollarSign />
              {onGetVariant().price}
            </h4>
            <h4>
              <FaDollarSign />
              {onGetVariant().salePrice}
            </h4>
          </Prices>
          {onGetVariant().quanity > 0 ? (
            <StyledProductSingleAction>
              <StyledProductAddCarts>
                <StyledGroupButtonAddCart>
                  <StyledButtonSub onClick={onClickSubQuantity}>
                    -
                  </StyledButtonSub>
                  <span>{quantity}</span>
                  <StyledButtonAdd onClick={onClickAddQuantity}>
                    +
                  </StyledButtonAdd>
                </StyledGroupButtonAddCart>
                <AddToCartButton>Add to cart</AddToCartButton>
              </StyledProductAddCarts>
            </StyledProductSingleAction>
          ) : (
            <OutOfStock>Out of Stock</OutOfStock>
          )}
        </Header>

        <Variants>
          {variant.map((item, index) => {
            return (
              <div key={index}>
                <h4>{item.variant}</h4>
                <VariantContainer>
                  {item.values.map((value, i) => {
                    return (
                      <Variant
                        $active={onActive(index, i)}
                        onClick={() => onClickVariant(index, i)}
                        key={i}
                      >
                        {value}
                      </Variant>
                    );
                  })}
                </VariantContainer>
              </div>
            );
          })}
        </Variants>
        <Payment>
          <StyledShippingBoxWrap>
            <div>
              <h4>Shipping Fee</h4>
              <ul>
                <li>Ha Noi city - 20.000 USD</li>
                <li>The remaining provinces - 25,000 USD</li>
              </ul>
            </div>
            <div>
              <h4>Expected ship time</h4>
              <ul>
                <li>Ha Noi, Ho Chi Minh city: 1-2 days</li>
                <li>The remaining provinces: 3-5 days</li>
              </ul>
            </div>
          </StyledShippingBoxWrap>
        </Payment>
        <ProductSingleInformation data={data} />
      </Detail>
    </Container>
  );
}

function EmblaCarousel(props) {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <img
                  src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((item, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Thumb(props) {
  const { selected, item, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <Image src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName} />
      </button>
    </div>
  );
}
