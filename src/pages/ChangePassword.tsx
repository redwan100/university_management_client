import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/feature/admin/userManagement.api";
import { logOut } from "../redux/feature/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await changePassword(data);
    console.log({ res });
    if (res?.data?.success) {
      dispatch(logOut());
      navigate("/login");
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label={"Old Password"} />

        <PHInput type="text" name="newPassword" label="New Password" />

        <Button htmlType="submit">Change Password</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
