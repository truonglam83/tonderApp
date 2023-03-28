import withAuth from "@/HOC/auth";
import { ACCESS_TOKEN } from "@/utils/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProfileHeader from "../../components/profile-layout/header/index";
import ProfileContainer from "../../components/profile-layout/index";
import profileStyle from "./profile.module.scss";
import { Spin } from "antd";

const Profile = () => {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const handleLogout = () => {
        // clear token and user in local
        localStorage.removeItem(ACCESS_TOKEN);
        // close modal
        setOpen(false);
        router.push("/");
    };

    useEffect(() => {
        setInterval(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Spin tip="Loading" size="large" />
                </div>
            ) : (
                <section className={profileStyle["profile__container"]}>
                    <ProfileHeader setOpen={setOpen} open={open} handleLogout={handleLogout} />
                    <ProfileContainer />
                </section>
            )}
        </>
    );
};

export default withAuth(Profile);
