import styled from "styled-components";
import { useState, useRef } from "react";
import TextEditor from "./components/TextEditor/TextEditor";
import TextInput from "@/shared/components/Input/TextInput";
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
    grid-template-columns: 1fr auto;
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

export default function AdminProductNew() {
  const readCategoryRequest = ReadCategoryRequest();
  const readTypeRequest = ReadTypeRequest();

  const [showVariant, setShowVariant] = useState(false);
  const [showUnit, setShowUnit] = useState(false);

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
        alert("Invalid file type! Please select a valid image file.");
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

  const onShowVariantDetail = () => {
    const variants = state.variants.filter((item) =>
      item.value.find((valueItem) => valueItem != "")
    );

    const detail = [];
    if (variants.length == 1) {
      for (let i = 0; i < variants[0].value.length; i++) {
        detail.push(variants[0].value[i]);
      }
    }

    if (variants.length == 2) {
      for (let i = 0; i < variants[0].value.length; i++) {
        for (let j = 0; j < variants[1].value.length; j++) {
          if (variants[0].value[i] == "" || variants[1].value[j] == "") {
            continue;
          }
          detail.push(`${variants[0].value[i]}/${variants[1].value[j]}`);
        }
      }
    }

    if (variants.length == 3) {
      for (let i = 0; i < variants[0].value.length; i++) {
        for (let j = 0; j < variants[1].value.length; j++) {
          for (let z = 0; z < variants[2].value.length; z++) {
            if (
              variants[0].value[i] == "" ||
              variants[1].value[j] == "" ||
              variants[2].value[z] == ""
            ) {
              continue;
            }
            detail.push(`${variants[0].value[i]}/${variants[1].value[j]}/${variants[2].value[z]}`);
          }
        }
      }
    }

    return detail;
  };

  return (
    <Container>
      <h4>Create new product</h4>
      <Content>
        <Left>
          <ContentContainer>
            <h5>General info</h5>
            <hr />
            <ContentItem>
              <h5>Product name</h5>
              <TextInput
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
                  {state.images.map((item) => {
                    return (
                      <div>
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
                              <FaTrash onClick={() => onDeleteVariant(variantIndex)} />
                            </div>
                          </SelectVariant>
                          <VariantValue>
                            <h5>Value</h5>
                            {variant.value.map((item, valueIndex) => {
                              return (
                                <div key={valueIndex}>
                                  <TextInput
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
                                    }}
                                  />
                                  {variant.value.length > 2 && item != "" ? (
                                    <AiOutlineClose
                                      onClick={() => onClickRemoveValue(variant, valueIndex)}
                                    />
                                  ) : (
                                    <span></span>
                                  )}
                                </div>
                              );
                            })}
                            <button>Done</button>
                          </VariantValue>
                        </VariantItemContainer>
                      );
                  })}
                  {state.variants.length < 3 && (
                    <button onClick={onAddMoreVariant}>
                      <FaPlus />
                      Add more variant
                    </button>
                  )}
                  {checkVariantExist() && (
                    <VariantDetailContainer>
                      <hr />
                      {onShowVariantDetail().map((item) => {
                        console.log(item);
                        return <p>{item}</p>;
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
              <button onClick={console.log(state)}>sss</button>
            </ContentItem>
          </ShowInfo>
        </Right>
      </Content>
    </Container>
  );
}
