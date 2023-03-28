import { MouseEventHandler, useEffect } from "react";
import style from "./listChat.module.scss";
import { Avatar, List, message } from "antd";
import { AppDispatch, RootState } from "@/redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getAllListChatApi } from "@/redux/reducers/chatReducer";
import { format } from 'timeago.js'
type Props = {
  OnClick: (id: string) => void;
};
export function ListChat({ OnClick }: Props) {

  const dispatch: AppDispatch = useDispatch();

  const { listChat } = useSelector((state: RootState) => state.chatReducer);

  useEffect(() => {
    dispatch(getAllListChatApi())
  }, [])

  if (!listChat) {
    return (
      <p>Không có tin nhắn hiển thị</p>
    )
  } else {
    return (

      <List
        className={style.list__chat}
        itemLayout="horizontal"
        dataSource={listChat}
        renderItem={(item) => {
          return (
            <List.Item onClick={() => OnClick(item.conversation_id)} key={item.id}>
              <List.Item.Meta
                className={style.list__item}
                avatar={
                  <Avatar className={style.avatar} src={item.avatar} alt="avatar" />
                }
                title={
                  <a className={style.name} href="#">
                    {item.name}
                  </a>
                }

                description={<p className={style.message}>{item.content}</p>}
              />
              <span className={style.time}>{format(item.created_at)}</span>

            </List.Item>
          );
        }}
      />
    );
  }


}

export default ListChat;
