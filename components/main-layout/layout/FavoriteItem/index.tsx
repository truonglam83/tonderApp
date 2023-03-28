import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import closeIcon from "../../../../public/icons/close.svg";
import likeIcon from "../../../../public/icons/like.svg";
import style from "./favoriteItem.module.scss";
import avatar1 from '../../../../public/image/profile/avatar1.png'
import { MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "@/redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { createConversationApi } from "@/redux/reducers/chatReducer";

type Props = {
  img: StaticImageData | string | null;
  OnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  id: string;
};
function FavoriteItem({ id, img, OnClick }: Props) {

  const { conversation } = useSelector((state: RootState) => state.chatReducer)

  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  const handleSendMessage = async (userId: string) => {
    await dispatch(createConversationApi(userId))

    router.push(`../../../../../chat/message/${conversation?.conversation_id}`)

  }

  return (
    <div className={style.profile}>
      <Image
        className={style.avatar}
        src={avatar1}
        alt="avatar"
        width={100}
        height={100}
      />
      <div className={style.icon__wrap}>
        <button onClick={OnClick}>
          <Image className={style.icon} src={closeIcon} alt="closeIcon" />
        </button>
        <button>
          <Image onClick={() => handleSendMessage(id)} className={style.icon} src={likeIcon} alt="likeIcon" />
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;
