import styled from "styled-components";
import { useState, useRef } from "react";
import TextEditor from "./components/TextEditor/TextEditor";
import CustomInput from "./components/Input/CustomInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import { css } from "styled-components";
import variant_options from "./data/variant_options";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { ReadCategoryRequest } from "@/shared/api/categoryApi";
import useCreateProductReducer from "./hooks/useCreateProduct";
import { readCategoriesData } from "@/shared/utils/readCategoriesData";
import { ReadTypeRequest } from "@/shared/api/typeApi";
import { readTypesData } from "@/shared/utils/readTypesData";
import variant_detail_sample from "./data/variant_detail_sample";
import cartesian from "./utils/cartesian";
import { CiImageOn } from "react-icons/ci";
import PopUp from "@/shared/components/PopUp/PopUp";
import TextInput from "@/shared/components/Input/TextInput";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import ImagePopUp from "./components/CustomPopUp/ImagePopUp";

const Container = styled.div`
  max-width: 75rem;
  margin: auto;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 14px;

  > h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  * hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 3rem;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > div {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
    border-radius: 3px;
  }
`;

const Right = styled.div`
  > div {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
    position: sticky;
    top: 0;
  }
`;

const ShowInfo = styled.div`
  padding: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;

  > h5 {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & h5 {
    color: #6c798f;
    font-weight: 700;
    font-size: 15px;
  }

  ${(props) => {
    if (props.$split == true) {
      return css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        > div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      `;
    }
  }}
`;

const InputCheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;

  > input {
    cursor: pointer;
    width: 15px;
    height: 15px;
    background-color: blue;
  }
`;

const VariantItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 3rem;
  padding: 0 10px;

  & h5 {
    padding-bottom: 5px;
  }
`;

const VariantContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > button {
    color: #2962ff;
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    gap: 1rem;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
  }
`;

const SelectVariant = styled.div`
  > div {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 35px;
    column-gap: 1rem;

    > svg {
      color: #e55e5e;
      padding: 10px;
      width: 35px;
      height: 35px;
      cursor: pointer;
      &:hover {
        background-color: #edeff2;
      }
    }
  }
`;

const VariantValue = styled.div`
  > input {
    margin-bottom: 20px;
  }

  > button {
    align-self: flex-start;
    cursor: pointer;
    color: blue;
    background-color: white;
    border-radius: 5px;
    padding: 5px 10px;
    border: 1px solid rgba(0, 0, 255, 0.4);

    &:hover {
      background-color: rgba(0, 0, 255, 0.6);
      color: white;
    }
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1.5rem;
    column-gap: 10px;
    margin-bottom: 1rem;
    align-items: center;

    > svg {
      height: 1.3rem;
      width: 1.3rem;
      cursor: pointer;
    }
  }
`;

const ImageContainer = styled.div`
  > input {
    display: none;
  }
`;

const AddImageButton = styled.button`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 3rem 2rem;
  border: 1px dotted rgba(0, 0, 0, 0.2);

  > span {
    color: rgba(0, 0, 255, 0.5);
    font-size: 16px;
  }

  > svg {
    font-size: 45px;
    opacity: 0.3;
  }
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 9rem;
  gap: 10px;

  > div:nth-of-type(1) {
    grid-column: 1/3;
    grid-row: 1/3;
  }

  > div {
    border: 1px dotted rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const UnitContainer = styled.div`
  > div {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 10rem;
  }
`;

const VariantDetailContainer = styled.div``;

const VariantDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;

  > div:nth-of-type(1) {
    display: flex;
    gap: 10px;
    align-items: center;

    > svg {
      font-size: 3rem;
      opacity: 0.4;
      border: 1px solid rgba(0, 0, 0, 0.4);
      padding: 10px;
      cursor: pointer;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;

    > p:nth-of-type(1) {
      font-weight: 500;
    }

    > p:nth-of-type(2) {
      opacity: 0.6;
      font-size: 13px;
    }
  }

  & img {
    width: 3rem;
    height: 3rem;
  }
`;

const DoneContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  > p {
    font-weight: 600;
  }

  > div:nth-of-type(1) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    > button {
      border: none;
      padding: 2px 15px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
  }

  > div:nth-of-type(2) {
    text-align: right;
    > button {
      cursor: pointer;
      border-radius: 5px;
      padding: 2px 10px;
      border: none;
      background-color: white;
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
    }

    > button:hover {
      background-color: #edeff2;
    }
  }
`;

export default function AdminProductNew() {
  const readCategoryRequest = ReadCategoryRequest();
  const readTypeRequest = ReadTypeRequest();

  const [showVariant, setShowVariant] = useState(false);
  const [showUnit, setShowUnit] = useState(false);
  const [addNewStatus, setAddNewStatus] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [variantImagePopUp, setVariantImagePopUp] = useState(false);

  const [state, dispatch, ACTIONS] = useCreateProductReducer();
  const inputRef = useRef();

  const updateVariant = (value, index) => {
    state.variants[index].option = value;

    dispatch({
      type: ACTIONS.CHANGE_VARIANTS,
      next: [...state.variants],
    });
  };

  const onAddMoreVariant = () => {
    state.variants.push({ done: false, value: [""] });
    dispatch({
      type: ACTIONS.CHANGE_VARIANTS,
      next: [...state.variants],
    });
  };

  const onDeleteVariant = (key) => {
    dispatch({
      type: ACTIONS.CHANGE_VARIANTS,
      next: state.variants.filter((item, index) => index != key),
    });
  };

  const onClickRemoveValue = (variant, key) => {
    variant.value = variant.value.filter((value, index) => index != key);
    dispatch({
      type: ACTIONS.CHANGE_VARIANTS,
      next: [...state.variants],
    });
  };

  const getRemainVariant = () => {
    const options = [];
    state.variants.forEach((item) => options.push(item.option));

    return variant_options.filter((item) => !options.includes(item));
  };

  const onClickAddImage = () => {
    inputRef.current.click();
  };

  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) =>
        allowedFileTypes.includes(file.type)
      );

      if (!isValidFileType) {
        setImageError(true);
        // Clear the file input if the file type is invalid
        ev.target.value = null;
        return;
      }

      dispatch({ type: ACTIONS.CHANGE_IMAGES, next: [...state.images, ...ev.target.files] });
    }
  };

  const transformCategoriesData = () => {
    const data = readCategoriesData(readCategoryRequest);

    const option = [];

    for (let item of data) {
      option.push({ value: item.id, label: item.name });
    }

    return option;
  };

  const transformTypeData = () => {
    let data = readTypesData(readTypeRequest);
    data = data.filter((item) => item.nameType != "variant_type");
    const option = [];
    for (let item of data) {
      option.push({ value: item.id, label: item.name });
    }

    return option;
  };

  const checkVariantExist = () => {
    return state.variants.find((item) => item.value.find((itemValue) => itemValue != ""));
  };

  const transformToVariantDetail = () => {
    const allVariants = [];

    const generateVariantKey = (item) => {
      if (Array.isArray(item)) {
        return item.join("_");
      } else {
        return item;
      }
    };

    for (let variant of state.variants) {
      if (!variant.value.find((item) => item != "")) {
        continue;
      }
      allVariants.push(variant.value.filter((item) => item != ""));
    }

    const variantDetail = cartesian(...allVariants);
    console.log(variantDetail);

    dispatch({
      type: ACTIONS.CHANGE_VARIANT_DETAIL,
      next: variantDetail.map((variant) => {
        const key = generateVariantKey(variant);
        let oldVariant;
        if (
          (oldVariant = state.variant_detail.find(
            (item) => generateVariantKey(item.variant) == key
          ))
        ) {
          return { ...oldVariant, variant: Array.isArray(variant) ? variant : [variant] };
        } else {
          return {
            variant: Array.isArray(variant) ? variant : [variant],
            ...variant_detail_sample,
          };
        }
      }),
    });
  };

  const onAddNewTypeVariant = (value) => {
    for (let item of state.variant_detail) {
      item.variant.push(value);
    }

    dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: state.variant_detail });
  };

  const checkIfNewVariantType = (variant) => {
    const slice = variant.value.filter((item, index) => index != 0);

    if (!slice.find((item) => item != "")) {
      return true;
    }

    return false;
  };

  const checkRemoveable = (value) => {
    if (value.length == 1 || (value.length == 2 && value[1] == "")) {
      return true;
    }

    return false;
  };

  return (
    <Container>
      {imageError && (
        <ErrorPopUp
          header={"Invalid Type"}
          message={"Invalid file type! Please select a valid image file"}
          action={() => setImageError(false)}
        />
      )}

      <h4>Create new product</h4>
      <Content>
        <Left>
          <ContentContainer>
            <h5>General info</h5>
            <hr />
            <ContentItem>
              <h5>Product name</h5>
              <CustomInput
                placeholder={"Input product name"}
                state={state.productName}
                setState={(value) => dispatch({ type: ACTIONS.CHANGE_NAME, next: value })}
              />
            </ContentItem>
            <ContentItem $split={true}>
              <div>
                <h5>Category</h5>
                <SelectInput options={transformCategoriesData()} />
              </div>
            </ContentItem>
            <ContentItem>
              <h5>Description</h5>
              <hr />
              <TextEditor
                state={state.description}
                setState={(value) => dispatch({ type: ACTIONS.CHANGE_DESCRIPTION, next: value })}
              />
            </ContentItem>
          </ContentContainer>
          <ContentContainer>
            <h5>Product images</h5>
            <hr />
            <ImageContainer>
              {state.images.length > 0 && (
                <Images>
                  {state.images.map((item, index) => {
                    return (
                      <div key={index}>
                        <img src={URL.createObjectURL(item)} />
                      </div>
                    );
                  })}
                  <AddImageButton onClick={onClickAddImage}>
                    <BiImageAdd />
                  </AddImageButton>
                </Images>
              )}

              {state.images.length == 0 && (
                <AddImageButton onClick={onClickAddImage}>
                  <BiImageAdd />
                  <span>Add Image</span>
                </AddImageButton>
              )}
              <input ref={inputRef} onChange={handleImageChange} type="file" multiple />
            </ImageContainer>
          </ContentContainer>
          {showVariant || (
            <ContentContainer>
              <h5>Product Price</h5>
              <hr />
              <ContentItem>
                <ContentItem $split={true}>
                  <div>
                    <h5>Sale price</h5>
                    <TextInput placeholder={"0 $"} />
                  </div>
                  <div>
                    <h5>Compare price</h5>
                    <TextInput placeholder={"0 $"} />
                  </div>
                </ContentItem>
              </ContentItem>
            </ContentContainer>
          )}
          <ContentContainer>
            <h5>Product Unit</h5>
            <hr />
            <ContentItem>
              <InputCheckContainer>
                <input
                  onChange={() => {
                    setShowUnit((prev) => !prev);
                  }}
                  type="checkbox"
                />
                <span>
                  Variants with multiple units of measurement (e.g., cans, packs, cases...).
                </span>
              </InputCheckContainer>

              {showUnit && (
                <UnitContainer>
                  <hr />
                  <div>
                    <h5>Basic unit</h5>
                    <TextInput
                      state={state.unit}
                      setState={(value) => dispatch({ type: ACTIONS.CHANGE_UNIT, next: value })}
                      placeholder={"Input basic unit"}
                    />
                  </div>
                </UnitContainer>
              )}
            </ContentItem>
          </ContentContainer>
          <ContentContainer>
            <h5>Variants</h5>
            <hr />
            <ContentItem>
              <InputCheckContainer>
                <input
                  onChange={() => {
                    if (showVariant == false) {
                      dispatch({
                        type: ACTIONS.CHANGE_VARIANTS,
                        next: [{ done: false, value: [""] }],
                      });
                    }

                    if (showVariant == true) {
                      dispatch({ type: ACTIONS.CHANGE_VARIANTS, next: [] });
                      dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: [] });
                    }

                    setShowVariant((prev) => !prev);
                  }}
                  type="checkbox"
                />
                <span>This product has many variants, such as different in size and color</span>
              </InputCheckContainer>
              <hr />
              {showVariant && (
                <VariantContainer>
                  {state.variants.map((variant, variantIndex) => {
                    if (variant.done == false)
                      return (
                        <VariantItemContainer key={variantIndex}>
                          <SelectVariant>
                            <h5>Variant</h5>
                            <div>
                              <SelectInput
                                setState={(value) => updateVariant(value, variantIndex)}
                                options={getRemainVariant(transformTypeData())}
                                state={variant.option}
                              />
                              {checkRemoveable(variant.value) && (
                                <FaTrash
                                  onClick={() => {
                                    if (variant.value != "") {
                                      state.variant_detail.forEach((variantDetail) => {
                                        variantDetail.variant = variantDetail.variant.filter(
                                          (item, index) => {
                                            if (
                                              item != variant.value.slice(0, -1) ||
                                              index != variantIndex
                                            ) {
                                              return true;
                                            }
                                          }
                                        );
                                      });
                                      state.variant_detail = state.variant_detail.filter(
                                        (item) => item.variant.length != 0
                                      );

                                      dispatch({
                                        type: ACTIONS.CHANGE_VARIANT_DETAIL,
                                        next: state.variant_detail,
                                      });
                                    }
                                    onDeleteVariant(variantIndex);
                                  }}
                                />
                              )}
                            </div>
                          </SelectVariant>
                          <VariantValue>
                            <h5>Value</h5>
                            {variant.value.map((item, valueIndex) => {
                              return (
                                <div key={valueIndex}>
                                  <CustomInput
                                    state={item}
                                    setState={(value) => {
                                      if (variant.value[valueIndex + 1] == null) {
                                        variant.value[valueIndex + 1] = "";
                                        dispatch({
                                          type: ACTIONS.CHANGE_VARIANTS,
                                          next: [...state.variants],
                                        });
                                      }
                                      variant.value[valueIndex] = value;
                                      dispatch({
                                        type: ACTIONS.CHANGE_VARIANTS,
                                        next: [...state.variants],
                                      });
                                      if (item != "") {
                                        const allVariants = [];
                                        for (let variant of state.variants) {
                                          if (!variant.value.find((item) => item != "")) {
                                            continue;
                                          }
                                          allVariants.push(
                                            variant.value.filter((item) => item != "")
                                          );
                                        }

                                        const variantDetail = cartesian(...allVariants);

                                        let n = 0;
                                        state.variant_detail.map((detail) => {
                                          detail.variant = variantDetail[n++];
                                          if (!Array.isArray(detail.variant)) {
                                            detail.variant = [detail.variant];
                                          }
                                        });

                                        dispatch({
                                          type: ACTIONS.CHANGE_VARIANT_DETAIL,
                                          next: state.variant_detail,
                                        });
                                        return;
                                      }
                                      if (item == "" && value != "" && valueIndex == 0) {
                                        if (checkIfNewVariantType(variant)) {
                                          onAddNewTypeVariant(value);
                                          transformToVariantDetail();
                                        }
                                      }
                                      if (item == "" && value != "" && valueIndex != 0) {
                                        transformToVariantDetail();
                                      }
                                    }}
                                  />
                                  {variant.value.length > 2 && item != "" ? (
                                    <AiOutlineClose
                                      onClick={() => {
                                        onClickRemoveValue(variant, valueIndex);
                                        state.variant_detail = state.variant_detail.filter(
                                          (variantDetail, index) => {
                                            return variantDetail.variant[variantIndex] != item;
                                          }
                                        );
                                        dispatch({
                                          type: ACTIONS.CHANGE_VARIANT_DETAIL,
                                          next: state.variant_detail,
                                        });
                                      }}
                                    />
                                  ) : (
                                    <span></span>
                                  )}
                                </div>
                              );
                            })}
                            <button
                              onClick={() => {
                                variant.done = true;

                                dispatch({
                                  type: ACTIONS.CHANGE_VARIANTS,
                                  next: state.variants,
                                });
                              }}
                            >
                              Done
                            </button>
                          </VariantValue>
                        </VariantItemContainer>
                      );
                    if (variant.done == true) {
                      return (
                        <DoneContainer>
                          <p>{variant.option.label}</p>
                          <div>
                            {variant.value.map((item, index) => {
                              if (item != "") {
                                return <button key={index}>{item}</button>;
                              }
                            })}
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                variant.done = false;

                                dispatch({
                                  type: ACTIONS.CHANGE_VARIANTS,
                                  next: state.variants,
                                });
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </DoneContainer>
                      );
                    }
                  })}
                  {state.variants.length < 3 && (
                    <button onClick={onAddMoreVariant}>
                      <FaPlus />
                      Add more variant
                    </button>
                  )}
                  {checkVariantExist() && (
                    <VariantDetailContainer>
                      {state.variant_detail.map((item, key) => {
                        return (
                          <VariantDetail
                            key={key}
                            onClick={() => {
                              item.sellPrice = 10;
                              dispatch({
                                type: ACTIONS.CHANGE_VARIANT_DETAIL,
                                next: state.variant_detail,
                              });
                            }}
                          >
                            <div>
                              {item.image ? (
                                <img src={URL.createObjectURL(item.image)} />
                              ) : (
                                <>
                                  <CiImageOn onClick={() => setVariantImagePopUp(true)} />
                                  {variantImagePopUp && (
                                    <ImagePopUp
                                      action={() => setVariantImagePopUp(false)}
                                      images={state.images}
                                      state={item.image}
                                      setState={(image) => {
                                        item.image = image;
                                        dispatch({
                                          type: ACTIONS.CHANGE_VARIANT_DETAIL,
                                          next: state.variant_detail,
                                        });
                                      }}
                                    />
                                  )}
                                </>
                              )}
                              {item.variant.join("/")}
                            </div>
                            <div>
                              <p>{item.sellPrice} $ </p>
                              <p>{item.inventory} sellable in inventory</p>
                            </div>
                          </VariantDetail>
                        );
                      })}
                    </VariantDetailContainer>
                  )}
                </VariantContainer>
              )}
            </ContentItem>
          </ContentContainer>
        </Left>
        <Right>
          <ShowInfo>
            <ContentItem>
              <h5>Show</h5>
              <hr />
              <button onClick={() => console.log(state.variant_detail)}>sss</button>
            </ContentItem>
          </ShowInfo>
        </Right>
      </Content>
    </Container>
  );
}
