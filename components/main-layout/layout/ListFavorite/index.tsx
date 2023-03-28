import FavoriteItem from "../FavoriteItem";
import avatar1 from "../../../../public/image/profile/avatar1.png";
import avatar2 from "../../../../public/image/profile/avatar2.png";
import avatar3 from "../../../../public/image/profile/avatar3.png";
import style from "./listFavorite.module.scss";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { AppDispatch, RootState } from "@/redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getMatchedUserApi } from "@/redux/reducers/chatReducer";
import React from "react";
export function ListFavorite() {

  const dispatch: AppDispatch = useDispatch();
  const { matchedUser } = useSelector((state: RootState) => state.chatReducer);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClickUnfriend = () => {
    showModal();
  };

  useEffect(() => {
    dispatch(getMatchedUserApi())
  }, [])


  return (
    <div className={style.favorite__list}>
      {
        matchedUser && matchedUser.map((user) => (
          <React.Fragment key={user.id}>
            <FavoriteItem OnClick={handleClickUnfriend} id={user.id} img={user.avatar} />
          </React.Fragment>
        ))
      }

      <Modal
        title="Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this friend?</p>
      </Modal>
    </div>
  );
}

export default ListFavorite;
