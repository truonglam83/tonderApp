import React from 'react'
import styles from './messages.module.scss'
import Image from 'next/image'
import avatar1 from '../../../../public/image/profile/avatar1.png'
import { IChatContent } from '@/interface/chat-interface'
type IMessages = {
    own?: boolean;
    data: IChatContent,
}

const Messages = ({ own, data }: IMessages) => {
    return (
        <div className={own ? `${styles.message} ${styles.own}` : styles.message}>
            <div className={styles.message__top}>
                <Image src={avatar1} className={styles.message__image} alt="avatar" />
                <p className={styles.message__text}>{data?.content}</p>
            </div>
            <p className={styles.message__bottom}>{(data.createdAt)}</p>
        </div>
    )
}

export default Messages