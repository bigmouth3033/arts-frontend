import { GetAdminProductRequest } from "./api/productAdminApi";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductPagination from "./components/pagination/ProductPagination";
import { useNavigate } from "react-router-dom";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";
import NumberInput from "@/shared/components/Input/NumberInput";
import React from "react";
import TextInput from "@/shared/components/Input/TextInput";
import { IoFilterOutline } from "react-icons/io5";
import SelectInput from "@/shared/components/Input/SelectInput";
import { readCategoriesData } from "@/shared/utils/readCategoriesData";
import SelectMultiple from "./components/inputs/SelectMultiple";
import { ReadCategoryRequest } from "@/shared/api/categoryApi";

const Container = styled.div`
  margin: auto;
  max-width: 75rem;
  font-size: 14px;
  min-height: 40rem;
  padding: 3rem 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  > h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  > button {
    cursor: pointer;
    background-color: #2962ff;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    border: none;
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
  }

  > button:hover {
    background-color: #0052cc;
  }
`;

const Content = styled.div`
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.div`
  padding: 2rem 2rem;
`;

const TableContent = styled.table`
  border-collapse: collapse;

  font-size: 0.9em;
  min-width: 400px;

  overflow: hidden;

  thead tr {
    background-color: #0091ea;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & td > button {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    cursor: pointer;
  }
`;

const DisplayName = styled.td`
  display: flex;
  align-items: center;
  gap: 1rem;

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
  }

  > div:nth-of-type(1) {
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Variants = styled.div``;

const VariantDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 5px;
  margin: 10px 0;
  align-items: center;

  & button {
    text-align: right;
  }
`;

const SaveButton = styled.div`
  background-color: #2962ff;
  color: white;
  padding: 10px 1rem;
  width: fit-content;
  border-radius: 5px;
  cursor: pointer;
`;

const FilterBar = styled.div`
  padding: 1rem 0.9rem;
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;

  gap: 0.6rem;
  margin-bottom: 1rem;
`;

const FilterCotainer = styled.div`
  position: relative;

  > button {
    font-size: 16px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    cursor: pointer;
    padding: 6px 2rem;
    display: flex;
    align-items: center;
    gap: 6px;
    > svg {
      font-size: 1.6rem;
    }
  }
`;

const FilterDropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateY(10px);
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 1rem;
  width: 20rem;
  z-index: 1;
`;

const pageOptions = [
  { value: 5, label: "5 items" },
  { value: 10, label: "10 items" },
  { value: 20, label: "20 items" },
  { value: 50, label: "50 items" },
  { value: 100, label: "100 items" },
];

export default function AdminProductList() {
  const dropDownRef = useRef();
  const buttonRef = useRef();
  const readCategoryRequest = ReadCategoryRequest();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("currentpage") || 1);
  const [pageSize, setPageSize] = useState(
    searchParams.get("pagesize")
      ? pageOptions.find((item) => item.value == searchParams.get("pagesize"))
      : null
  );
  const [showMore, setShowMore] = useState([]);
  const [inputs, setInputs] = useState({});
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [displaySearch, setDisplaySearch] = useState(searchParams.get("search") || "");
  const [onShowDropDown, setOnShowDropDown] = useState(false);
  const [categorySelect, setCategorySelect] = useState([]);

  const getAdminProductRequest = GetAdminProductRequest(
    currentPage,
    pageSize?.value,
    categorySelect?.map((item) => item.value),
    search
  );

  const onChangePage = (page) => {
    setSearchParams({ currentpage: page, pagesize: pageSize.value, search: search });
    setCurrentPage(page);
  };

  const transformCategoriesData = () => {
    const data = readCategoriesData(readCategoryRequest);

    const option = [];

    for (let item of data) {
      option.push({ value: item.id, label: item.name });
    }

    return option;
  };

  const onMakeChanges = (product) => {
    console.log(product);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(displaySearch);
      setSearchParams({
        currentpage: currentPage,
        pagesize: pageSize.value,
        search: displaySearch,
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [displaySearch]);

  useEffect(() => {
    const event = (ev) => {
      if (
        dropDownRef &&
        !dropDownRef.current.contains(ev.target) &&
        !buttonRef.current.contains(ev.target)
      ) {
        setOnShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", event);

    return () => {
      document.removeEventListener("mousedown", event);
    };
  }, []);

  return (
    <Container>
      <Header>
        <h4>Products</h4>
        <button onClick={() => navigate("/admin/product-new")}>
          <IoMdAddCircleOutline />
          Add Product
        </button>
      </Header>
      <Content>
        <FilterBar>
          <FilterCotainer>
            <button ref={buttonRef} onClick={() => setOnShowDropDown((prev) => !prev)}>
              <IoFilterOutline />
              Filter
            </button>
            {onShowDropDown && (
              <FilterDropDown ref={dropDownRef}>
                <h4>Filter by categories:</h4>
                <SelectMultiple
                  state={categorySelect}
                  setState={setCategorySelect}
                  options={transformCategoriesData()}
                />
              </FilterDropDown>
            )}
          </FilterCotainer>
          <TextInput
            state={displaySearch}
            setState={(value) => {
              setDisplaySearch(value);
            }}
            placeholder={"Search"}
          />
          <SelectInput
            state={pageSize}
            options={pageOptions}
            setState={(value) => {
              setSearchParams({ currentpage: currentPage, pagesize: value.value, search: search });
              setPageSize(value);
            }}
          />
        </FilterBar>
        <TableContent>
          <thead>
            <tr>
              <th style={{ width: "65%" }}>NAME</th>
              <th>AVAILABLE</th>
              <th>ON STOCK</th>
              <th>ACTIVE</th>
              <th>TYPE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {getAdminProductRequest.isSuccess ? (
              getAdminProductRequest.data.data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <DisplayName>
                        <div>
                          <img
                            src={
                              import.meta.env.VITE_API_IMAGE_PATH + item.productImages[0].imageName
                            }
                          />
                        </div>
                        <div>
                          <Link to={`/admin/product?id=${item.id}`}>{item.name}</Link>{" "}
                          <span>{item.variants.length} variants</span>
                        </div>
                      </DisplayName>
                      <td>
                        {item.variants.reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.availableQuanity;
                        }, 0)}
                      </td>
                      <td>
                        {item.variants.reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.quanity;
                        }, 0)}
                      </td>
                      <td>{item.isActive == true ? "ACTIVE" : "UNACTIVE"}</td>
                      <td>{item.category.name}</td>
                      <td>
                        {!showMore.includes(index) && (
                          <button
                            onClick={() => {
                              setShowMore((prev) => {
                                if (prev.includes(index)) {
                                  return prev.filter((item) => item != index);
                                }
                                return [...prev, index];
                              });

                              setInputs((prev) => {
                                return { ...prev, [index]: JSON.parse(JSON.stringify(item)) };
                              });
                            }}
                          >
                            More
                            <MdOutlineExpandMore />
                          </button>
                        )}

                        {showMore.includes(index) && (
                          <button
                            onClick={() => {
                              setShowMore((prev) => {
                                if (prev.includes(index)) {
                                  return prev.filter((item) => item != index);
                                }
                                return [...prev, index];
                              });

                              setInputs((prev) => {
                                return { ...prev, [index]: null };
                              });
                            }}
                          >
                            Hide
                            <MdOutlineExpandLess />
                          </button>
                        )}
                      </td>
                    </tr>
                    {showMore.includes(index) && (
                      <tr>
                        <td colSpan={"100%"}>
                          <Variants>
                            <VariantDetail>
                              <h4></h4>
                              <h4>Sale Price</h4>
                              <h4>Compare Price</h4>
                              <h4>Available Quantity</h4>
                            </VariantDetail>
                            {inputs[index].variants.map((item, index) => {
                              const name = [];
                              item.variantAttributes.forEach((item, index) =>
                                name.push(item.attributeValue)
                              );
                              return (
                                <VariantDetail key={index}>
                                  <h4>{name.join("/")}</h4>
                                  <div>
                                    <NumberInput
                                      state={item.price}
                                      setState={(value) => {
                                        item.price = value;
                                        setInputs({ ...inputs });
                                      }}
                                    />
                                  </div>

                                  <div>
                                    <NumberInput
                                      state={item.salePrice}
                                      setState={(value) => {
                                        item.salePrice = value;
                                        setInputs({ ...inputs });
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <NumberInput
                                      state={item.availableQuanity}
                                      setState={(value) => {
                                        item.availableQuanity = value;
                                        setInputs({ ...inputs });
                                      }}
                                    />
                                  </div>
                                </VariantDetail>
                              );
                            })}
                            <VariantDetail>
                              <span></span>
                              <span></span>
                              <span></span>
                              <SaveButton onClick={() => onMakeChanges(inputs[index])}>
                                save
                              </SaveButton>
                            </VariantDetail>
                          </Variants>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td>
                  <WaitingIcon />
                </td>
              </tr>
            )}
          </tbody>
        </TableContent>
        <Footer>
          {getAdminProductRequest.isSuccess && (
            <ProductPagination
              currentPage={currentPage}
              setCurrentPage={onChangePage}
              totalPage={getAdminProductRequest.data.totalPages}
            />
          )}
        </Footer>
      </Content>
    </Container>
  );
}
