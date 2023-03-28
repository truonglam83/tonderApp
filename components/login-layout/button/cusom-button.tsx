import React from 'react'
import Image from 'next/image'
import arrow from '../../../public/images/button/arrow.png'
import styles from './custom-button.module.scss'
import { Button } from 'antd';
type Props = {
    title: string,
    image: boolean,
    classname: string,
    handleClick?: () => void,
}

const CustomButton = ({ title, image, classname, handleClick }: Props) => {
    return (

        <Button htmlType="submit" onClick={handleClick} className={`${styles.button__custom} ${classname}`}>
            <p className={styles.button__text}>{title}</p>
            {image && <Image src={arrow} alt='arrow' />}
        </Button>

    )
}

export default CustomButton
