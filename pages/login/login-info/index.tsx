import React, { useState } from "react";
import { Input, Space, Select, DatePicker, DatePickerProps } from "antd";
import styles from "./loginInfo.module.scss";
import InputInfo from "../../../components/login-layout/welcome/login-info/login-info";
import HeaderLogin from "../../../components/login-layout/welcome/login-phone/header-login/header-login";
import loginInfoPhoto from "../../../public/images/loginPhone/loginInfoPhoto.png";
import CustomButton from "../../../components/login-layout/button/cusom-button";
import { useFormik } from "formik";
import { ICreateUser } from "@/interface/login-interface";
import { RootState } from "@/redux/configStore";
import { useSelector } from "react-redux";
import { createNewUserApi } from "@/redux/reducers/loginReducer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { validation } from "@/utils/validation";
import { GENDER } from "@/types/user-types";
import withAuth from "../../../HOC/auth";

const LoginInfo = () => {
    const router = useRouter();

    const [birthday, setBirthday] = useState("");
    const [selectValue, setSelectValue] = useState("Male");

    const { loginPhone } = useSelector((state: RootState) => state.loginReducer);

    let userStorage;

    if (typeof window !== "undefined") {
        userStorage = localStorage?.getItem("user");
    }
    const formik = useFormik<ICreateUser>({
        initialValues: {
            name: userStorage ? JSON.parse(userStorage).name : "",
            email: userStorage ? JSON.parse(userStorage).email : "",
            age: 0,
            gender: "",
        },
        validationSchema: validation,
        onSubmit: async (values: ICreateUser) => {
            values.age = +birthday;
            values.gender = selectValue;

            await createNewUserApi(values);

            router.push("../home");
            toast.success("Đăng nhập thành công");
        },
    });

    const handleSelectGender = (value: string) => {
        setSelectValue(value);
    };

    const handleChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
        const calculateAge = (birthday: string) => {
            // Date.now() => contains the timestamp of the current date-time in milliseconds.
            // Constructed a new Date instance. Then, called getTime
            // to get the millisecond-accurate timestamp of the birthday.
            const ageDiffMs = Date.now() - new Date(birthday).getTime();

            //  ageDate => Sun Dec 30 2000 01:04:57 GMT+0800
            const ageDate = new Date(ageDiffMs);

            // ageDate.getFullYear() => 2000
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        };

        const age = calculateAge(dateString);

        setBirthday(`${age}`);
    };

    if (loginPhone.isPhoneConfirmed === true) {
        router.push("../home");
    } else {
        return (
            <div className={`${styles.login__info} container`}>
                <HeaderLogin
                    title="Nhập số điện thoại để tiếp tục"
                    desc="Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập."
                    image={loginInfoPhoto}
                    href="otp"
                />
                <form onSubmit={formik.handleSubmit} className={styles.login__form}>
                    <div className={styles.form__input}>
                        <InputInfo label="Họ tên" value={formik.values.name}>
                            <Input
                                placeholder="Minh Thư"
                                className={styles.info__input}
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </InputInfo>
                        {formik.errors.name ? <p className={styles.error}>{formik.errors.name}</p> : ""}
                        <InputInfo label="Email" value={formik.values.email}>
                            <Input
                                placeholder="user@gmail.com"
                                className={styles.info__input}
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </InputInfo>
                        {formik.errors.email ? <p className={styles.error}>{formik.errors.email}</p> : ""}
                        <InputInfo label="Năm sinh" value={birthday}>
                            <Space
                                className={styles.info__date}
                                placeholder="none"
                                direction="vertical"
                                style={{ width: "100%" }}
                            >
                                <DatePicker style={{ width: "100%" }} onChange={handleChangeDate} />
                            </Space>
                        </InputInfo>

                        <InputInfo label="Giới tính" value={selectValue}>
                            <Select
                                defaultValue="Male"
                                style={{ width: "100%" }}
                                onChange={handleSelectGender}
                                value={selectValue}
                                options={[
                                    { value: GENDER.MALE, label: "Nam" },
                                    { value: GENDER.FEMALE, label: "Nữ" },
                                    { value: GENDER.OTHER, label: "Khác" },
                                ]}
                            />
                        </InputInfo>
                    </div>
                    <CustomButton title="Xong" image={false} classname="button__custom--center" />
                </form>
            </div>
        );
    }
};

export default withAuth(LoginInfo);
