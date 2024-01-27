import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { TUser, setUser } from "../redux/feature/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    console.log(data);
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data.accessToken) as TUser;

      dispatch(setUser({ user, token: res?.data?.accessToken }));
      toast.success("Login successful", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="id" label={"User ID"} />

        <PHInput type="text" name={"password"} label={"Password"} />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
