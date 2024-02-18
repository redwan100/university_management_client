import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../../redux/feature/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../types";

export type TTableData = Pick<TStudent, "email" | "id" | "contactNo">;
const StudentData = () => {
  const [page, setPage] = useState(1);

  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(({ _id, id, email, contactNo }) => ({
    key: _id,
    id,
    email,

    contactNo,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button size="small">Details</Button>
            </Link>
            <Button size="small">Update</Button>
            <Button size="small">Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
