"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store"; // تأكد من المسار الصحيح

interface ReduxProviderProps {
  children: ReactNode; // تحديد نوع children
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;