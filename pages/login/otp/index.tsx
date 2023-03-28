import HeaderLogin from "@/components/login-layout/welcome/login-phone/header-login/header-login";
import React, { useEffect, useState } from "react";
import styles from "./login-otp.module.scss";
import loginOtp from "../../../public/images/loginPhone/loginOTP.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/configStore";
import CustomButton from "@/components/login-layout/button/cusom-button";
import { userLoginPhoneApi } from "@/redux/reducers/loginReducer";
import { useRouter } from "next/router";
import OtpInput from "react18-input-otp";
import { message } from "antd";
import { ShowError } from "@/components/login-layout/show-error/show-error";

// handle calculate countdown time
const calcTimeLeft = (time: number) => {
    if (!time) return 0;

    const left = time - new Date().getTime();

    if (left < 0) return 0;

    return left;
};

const LoginOtp = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const [otp, setOtp] = useState<string>("");

    const endTime = new Date().getTime() + 60000 * 60; // 1 hour
    const [end, setEndTime] = useState(endTime);
    const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(end));

    const minutes = Math.floor(timeLeft / 60000) % 60;
    const seconds = Math.floor(timeLeft / 1000) % 60;

    const [messageApi, contextHolder] = message.useMessage();

    // function handle input otp
    const handleChangeOtp = (value: string): void => {
        setOtp(value);
    };
    // function handle verify otp
    const handleVerifyOtp = async () => {
        let confirmationResult = window.confirmationResult;

        confirmationResult &&
            confirmationResult
                .confirm(otp)
                .then((result: any) => {
                    console.log(result.user.phoneNumber);
                    // User signed in successfully.
                    const storage = localStorage.getItem("user");
                    const phone = result.user.phoneNumber.replace("+84", "0");

                    if (storage) {
                        const { email, name } = JSON.parse(storage);

                        const user = { phone: phone, email: email, name: name };
                        dispatch(userLoginPhoneApi(user));
                        console.log(phone);
                    } else {
                        const user = { phone: phone };
                        dispatch(userLoginPhoneApi(user));
                    }

                    router.push("login-info");
                })
                .catch((error: string) => {
                    console.log(error);
                    ShowError({
                        text: "Sai mã OTP. Vui lòng thử lại",
                        messageApi,
                        contextHolder,
                    });
                });
    };

    useEffect(() => {
        setTimeLeft(calcTimeLeft(end));

        const timer = setInterval(() => {
            const targetLeft = calcTimeLeft(end);
            setTimeLeft(targetLeft);

            if (targetLeft === 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [end]);

    return (
        <>
            {contextHolder}
            <div className={`${styles.login__otp} container`}>
                <HeaderLogin
                    title="Mã xác thực"
                    desc="Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập."
                    image={loginOtp}
                    href="/login"
                />
                <section className={styles.otp__body}>
                    <div className={styles.body__input}>
                        <div className={styles.body__board}>
                            <OtpInput value={otp} onChange={handleChangeOtp} numInputs={6} isInputNum={true} />
                        </div>
                    </div>

                    <p className={styles.otp__link}>
                        <u>Gửi lại OTP</u>
                        <span className={styles.time}>
                            {minutes}:{seconds}
                        </span>
                    </p>
                    <CustomButton
                        handleClick={handleVerifyOtp}
                        classname="button__custom--sb"
                        title="Tiếp tục"
                        image={true}
                    />
                </section>
            </div>
        </>
    );
};

export default LoginOtp;
