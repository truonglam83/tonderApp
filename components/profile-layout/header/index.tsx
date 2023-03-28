import profileStyle from "../../../pages/profile/profile.module.scss";
import { Modal, Space, Button } from "antd";
import logoutBtn from "../../../public/images/profile/button/logout.png";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { LogoutOutlined } from "@ant-design/icons";

interface IProfileHeader {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleLogout: () => void;
}

const ProfileHeader = ({ open, setOpen, handleLogout }: IProfileHeader) => {
    return (
        <div className={profileStyle["profile__container--header"]}>
            <span>Tài khoản</span>
            <LogoutOutlined onClick={() => setOpen(!open)} />
            <Modal
                title="Bạn có muốn đăng xuất"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                closable={true}
            >
                <Space style={{ width: "100%" }}>
                    <Button onClick={handleLogout} type="primary" block danger>
                        Đăng xuất
                    </Button>
                    <Button onClick={() => setOpen(false)}>Đóng</Button>
                </Space>
            </Modal>
        </div>
    );
};

export default ProfileHeader;
