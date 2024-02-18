import { Button, Modal, Table, TableColumnsType } from "antd";

import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/feature/admin/courseManagement.api";
import { useGetAllFacultyQuery } from "../../../redux/feature/admin/userManagement.api";
import { TSemester } from "../../../types";

export type TTableData = Pick<TSemester, "status" | "startDate" | "endDate">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const Courses = () => {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courseData?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    _id,
    title,
    code: `${prefix} ${code}`,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },

    {
      title: "Action",
      render: (item) => {
        return <AddFacultyModal data={item} />;
      },
    },
  ];
  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );

  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      pagination={false}
    />
  );
};

const AddFacultyModal = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: facultiesData } = useGetAllFacultyQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = async (faculties) => {
    const facultyData = {
      courseId: data.key,
      data: faculties,
    };

    await addFaculties(facultyData);
    handleCancel();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal onCancel={handleCancel} open={isModalOpen} footer={null}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOptions}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
