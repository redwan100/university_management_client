import { useGetAllSemesterQuery } from "../../../redux/feature/admin/academicManagement.api";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log(data);
  return <div>AcademicSemester</div>;
};

export default AcademicSemester;
