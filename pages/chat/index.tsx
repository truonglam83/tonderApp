import style from "./chat.module.scss";
import { Typography } from "antd";
import ListFavorite from "@/components/main-layout/layout/ListFavorite";
import ListChat from "@/components/main-layout/layout/ListChat";
import { useRouter } from "next/router";

const { Title } = Typography;

function Chat() {

  const router = useRouter()

  const handleOnclick = (id: string) => {
    console.log(id)
    router.push(`./chat/message/${id}`)
  };

  return (
    <div className={style.chat__wrapper}>
      <Title className={style.chat__title}>Trò chuyện</Title>
      <Title level={2} className={style.favorite__title}>
        Danh sách lượt thích
      </Title>
      <ListFavorite />
      <Title level={2} className={style.chatbox__title}>
        Trò chuyện
      </Title>
      <ListChat OnClick={handleOnclick} />
    </div>
  );
}

export default Chat;
