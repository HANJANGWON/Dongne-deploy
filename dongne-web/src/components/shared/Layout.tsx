import styled from "styled-components";
import { Header } from "../Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
