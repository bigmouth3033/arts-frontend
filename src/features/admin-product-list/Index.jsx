import { GetAdminProductRequest } from "./api/productAdminApi";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductPagination from "./components/pagination/ProductPagination";
import { useNavigate } from "react-router-dom";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";

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
`;

const Content = styled.div`
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

const Footer = styled.div`
  padding: 2rem 2rem;
`;

const TableContent = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
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
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function AdminProductList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(searchParams.get("currentpage") || 1);
  const [pageSize, setPageSize] = useState(searchParams.get("pagesize") || 20);
  const getAdminProductRequest = GetAdminProductRequest(currentPage, pageSize);

  useEffect(() => {
    if (getAdminProductRequest.isSuccess) {
      setTotalPage(getAdminProductRequest.data.totalPages);
    }
  }, [getAdminProductRequest.status]);

  const onChangePage = (page) => {
    setSearchParams({ currentpage: currentPage, pagesize: pageSize });
    setCurrentPage(page);
  };

  return (
    <Container>
      <Header>
        <h4>Product</h4>
        <button onClick={() => navigate("/admin/product-new")}>Create New Product</button>
      </Header>
      <Content>
        <TableContent>
          <thead>
            <tr>
              <th>NAME</th>
              <th>AVAILABLE</th>
              <th>ACTIVE</th>
              <th>TYPE</th>
            </tr>
          </thead>
          <tbody>
            {getAdminProductRequest.isSuccess ? (
              getAdminProductRequest.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <DisplayName>
                      <div>
                        <img
                          src={
                            import.meta.env.VITE_API_IMAGE_PATH + item.productImages[0].imageName
                          }
                        />
                      </div>
                      <div>
                        <span>{item.name}</span> <span>{item.variants.length} variants</span>
                      </div>
                    </DisplayName>
                    <td>
                      {item.variants.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.quanity;
                      }, 0)}
                    </td>
                    <td>{item.isActive == true ? "ACTIVE" : "UNACTIVE"}</td>
                    <td>{item.category.name}</td>
                  </tr>
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
          <ProductPagination
            currentPage={currentPage}
            setCurrentPage={onChangePage}
            totalPage={totalPage}
          />
        </Footer>
      </Content>
    </Container>
  );
}