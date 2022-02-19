import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
