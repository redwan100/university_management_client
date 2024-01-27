import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRout = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRout;
