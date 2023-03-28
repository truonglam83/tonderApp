import HeaderLogin from '@/components/login-layout/welcome/login-phone/header-login/header-login';
import React, { ChangeEvent, useState } from 'react';
import styles from './login.module.scss';
import Image from 'next/image';
import { RecaptchaVerifier } from "firebase/auth";
import flag from '../../public/images/loginPhone/vietnam.png';
import loginPhone from '../../public/images/loginPhone/loginPhone.png';
import CustomButton from '@/components/login-layout/button/cusom-button';
import { signInWithPhoneNumber } from "firebase/auth";
import authentication from '@/utils/firebase';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { ShowError } from '../../components/login-layout/show-error/show-error';


const LoginOtp = () => {

    const router = useRouter();

    const [messageApi, contextHolder] = message.useMessage();

    const [input, setInput] = useState<string>('');

    const handleInputPhone = (e: ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };


    const generateRecapcha = () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
                size: "visable", callback: () => {
                },
            }, authentication);
        } catch (error) {
            console.log(error)
        }
    };

    const handleSendOtp = async () => {
        generateRecapcha();

        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

        if (!input.match(regexPhoneNumber)) {
            ShowError({
                text: 'Số điện thoại không đúng định dạng',
                messageApi,
                contextHolder
            })
        }
        else {
            const appVerifier = window.recaptchaVerifier;
            try {
                const res = await signInWithPhoneNumber(authentication, `+84${input}`, appVerifier);

                window.confirmationResult = res;

                router.push('login/otp');

            } catch (error) {
                ShowError({
                    text: 'Có lỗi xảy ra vui lòng thử lại sau',
                    messageApi,
                    contextHolder
                })
            }
        }

    }
    return (
        <>
            {contextHolder}
            <div className={`${styles.login__phone} container`}>
                <HeaderLogin title='Nhập số điện thoại để tiếp tục' desc='Vui lòng nhập số điện thoại để đăng nhập và mua sắm tại CLM' image={loginPhone} href='/' />
                <section className={styles.phone__body}>
                    <div className={styles.body__input}>
                        <Image src={flag} alt='flag' />
                        <input value={input} onChange={handleInputPhone} placeholder='Nhập số điện thoại' type="text" />
                    </div>
                    <div id='recaptcha-container' />

                    <CustomButton handleClick={handleSendOtp} classname='button__custom--sb ' title='Xác thực' image={true} />
                </section>
            </div>
        </>)
}

export default LoginOtp