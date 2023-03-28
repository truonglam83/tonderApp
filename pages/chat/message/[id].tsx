import Image from "next/image";
import { Input } from "antd";
import style from "./message.module.scss";
import InfoItem from "../../../components/main-layout/layout/InfoItem";
import Direction from "../../../components/main-layout/layout/Direction";
import avatar from "../../../public/image//avatarChat/avatar_chat_1.png";
import addIcon from "../../../public/icons/addIcon.svg";
import sendIcon from "../../../public/icons/sendIcon.svg";
import textIcon from "../../../public/icons/textIcon.svg";
import loadIcon from "../../../public/icons/loadIcon.svg";
import { useEffect, useState } from 'react'
import Messages from "@/components/main-layout/layout/Messages/messages";
import { useRouter } from "next/router";
import { http } from "@/utils/config";
import React from "react";
import { IChatContent } from "@/interface/chat-interface";

const user = {
  avatar: avatar,
  name: "Cameron Greer",
  interval: "3 tuần",
};

const Message = () => {

  const router = useRouter()
  const { id } = router.query

  const [messages, setMessages] = useState<IChatContent[]>([]);

  const [inputValue, setInputValue] = useState("");

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  let currentUser: any;
  if (typeof window !== 'undefined') {
    currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  }

  const handleOnClick = async () => {

    const message = {
      sender: currentUser.id,
      content: inputValue,
      conversation_id: id,
      receiver: '0da79442-9c68-486e-92e0-f2af4fd43ef2',
    }

    try {
      const res = await http.post('/message', message)
      setMessages([...messages, res.data])
      setInputValue("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (id) {
          const response = await http.get(`/message/${id}`);
          setMessages(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMessages()
  }, [])

  console.log(messages)

  return (

    <div className={style.message__wrapper}>
      <Direction />
      <InfoItem image={avatar} name={user.name} interval={user.interval} />
      <ul className={style.chat__message}>
        {messages && <>
          {
            messages.map((message: IChatContent) => {
              return (
                <React.Fragment key={message.id}>

                  <Messages data={message} own={message.sender === currentUser.id} />
                </React.Fragment>
              )
            })
          }
        </>}

      </ul>
      <div className={style.set__message} >
        <Image className={style.add__icon} src={addIcon} alt="loadIcon" />
        <div className={style.input}>
          <Input
            onChange={handleOnchange}
            className={style.input__message}
            value={inputValue}
          />
          <Image className={style.text__icon} src={textIcon} alt="textIcon" />
          <Image className={style.load__icon} src={loadIcon} alt="loadIcon" />
        </div>
        <Image
          onClick={handleOnClick}
          className={style.send__icon}
          src={sendIcon}
          alt="sendIcon"
        />
      </div>
    </div>
  );
};

export default Message;
