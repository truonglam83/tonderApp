// HOC/withAuth.jsx
import { ACCESS_TOKEN, USER } from "@/utils/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// the below function could be any of your custom implementation for verifying the token. I've added it as means of explanantion

const withAuth = (WrapperComponent: any) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const Router = useRouter();
        const [verified, setVerified] = useState<boolean>(false);

        useEffect(() => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            // if no accessToken was found,then we redirect to "/" page.
            if (!accessToken) {
                Router.replace("/");
            } else {
                // verifies the token.
                const data = localStorage.getItem(ACCESS_TOKEN);
                // if token was verified we set the state.
                if (data) {
                    setVerified(true);
                } else {
                    // If the token was fraud we first remove it from localStorage and then redirect to "/"
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(USER);
                    Router.replace("/");
                }
            }
        }, []);

        if (verified) {
            return <WrapperComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default withAuth;
