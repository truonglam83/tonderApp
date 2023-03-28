import Image from "next/image";
import headerStyle from "./styles.module.scss";

function Header() {
  return <h1 className={headerStyle.body__title}>Tonder</h1>;
}

export default Header;
