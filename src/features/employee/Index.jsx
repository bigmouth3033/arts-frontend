import styled from "styled-components";
import { useEffect, useState } from "react";
import CreateEmployeePopUp from "./components/PopUp/CreateEmployeePopUp";
import { GetEmployeeRequest } from "./api/employeeApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import EmployeePagination from "./components/pagination/EmployeePagination";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

export default function Employee() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [createPopUp, setCreatePopUp] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(searchParams.get("currentpage") || 1);
  const [pageSize, setPageSize] = useState(searchParams.get("pagesize") || 20);
  const getEmployeeRequest = GetEmployeeRequest(currentPage, pageSize);

  useEffect(() => {
    if (getEmployeeRequest.isSuccess) {
      setTotalPage(getEmployeeRequest.data.totalPages);
    }
  }, [getEmployeeRequest.status]);

  const onChangePage = (page) => {
    setSearchParams({ currentpage: currentPage, pagesize: pageSize });
    setCurrentPage(page);
  };

  return (
    <Container>
      <Header>
        <h4>Employee</h4>
        <button onClick={() => setCreatePopUp(true)}>Create New Employee</button>
      </Header>
      <Content>
        <TableContent>
          <thead>
            <tr>
              <th>S.No</th>
              <th>EMAIL</th>
              <th>ID</th>
              <th>PHONE NUMBER</th>
              <th>WORKING STATUS</th>
              <th>ADDRESS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {getEmployeeRequest.isSuccess ? (
              getEmployeeRequest.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.email}</td>
                    <td>{item.id}</td>
                    <td>{item.phoneNumber || "_"}</td>
                    <td>{item.active ? "True" : "False"}</td>
                    <td>{item.address || "_"}</td>
                    <td>
                      <button>Active</button>
                      <button>Update</button>
                    </td>
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
          <EmployeePagination
            currentPage={currentPage}
            setCurrentPage={onChangePage}
            totalPage={totalPage}
          />
        </Footer>
      </Content>
      {createPopUp && <CreateEmployeePopUp action={() => setCreatePopUp(false)} />}
    </Container>
  );
}
