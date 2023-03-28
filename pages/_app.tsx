import store from "../redux/configStore";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import noSupportImg from "../public/images/welcome/Nosupport.png";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setIsMobile(window.innerWidth <= 768);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Provider store={store}>
            {isMobile ? (
                <Component {...pageProps} />
            ) : (
                <Image src={noSupportImg} alt="" style={{ width: "100%", backgroundSize: "100%" }} />
            )}
        </Provider>
    );
}
