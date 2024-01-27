import { ReactNode } from "react";

export type TRoutes = {
  path: string;
  element: ReactNode;
};

export type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
