import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/feature/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../types";

export type TTableData = Pick<TStudent, "email" | "id">;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const { data: studentData, isFetching } = useGetAllStudentsQuery(params);

  const tableData = studentData?.data?.map(({ _id, id, email }) => ({
    key: _id,
    id,
    email,
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
      title: "Action",
      render: () => {
        return (
          <Space>
            <Button size="small">Details</Button>
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default StudentData;
