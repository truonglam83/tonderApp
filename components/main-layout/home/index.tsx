import { ReactNode } from "react";
import Footer from "./footer/index";
import Header from "./header/index";

type Props = {
  children?: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <section className="container" style={{ height: "100vh" }}>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
