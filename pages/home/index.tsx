import { AppDispatch } from "@/redux/configStore";
import { Button, Carousel, Col, message, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import MainLayout from "../../components/main-layout/home/index";
// import Image from "next/image";
import { Image } from "antd";
import LocationSvg from "../../public/images/home/location.svg";

import HomeInfo from "./home-info";
import styleHome from "./home.module.scss";
import { IUser } from "@/interface/user-interface";
import { updateLocation } from "@/redux/reducers/locationReducer";
import { http } from "@/utils/config";
import { useDispatch } from "react-redux";
import { getUserByRadius } from "../../redux/reducers/userReducer";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import withAuth from "@/HOC/auth";
import {
  HeartIcon,
  PremiumIcon,
  UnlikeIcon,
} from "@/components/main-layout/home/icon";

// default avatar
const avatar =
  "https://inspektorat.mahakamulukab.go.id/assets/img/default/male.jpg";

const HomePage = () => {
  const [radius, setRadius] = useState(100000);
  const [messageApi, contextHolder] = message.useMessage();
  const [listUsers, setListUsers] = useState<IUser[]>();
  const dispatch: AppDispatch = useDispatch();
  const [userIdBlock, setUserIdBlock] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getUser();
  }, [radius]);

  const getUser = () => {
    const id = JSON.parse(`${localStorage.getItem("user")}`).id;
    navigator.geolocation.getCurrentPosition(async (position) => {
      // Update my location save to database
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const listUser = await dispatch(getUserByRadius(lat, long, radius));
      updateLocation(id, lat, long);

      // Filter user in black list
      const data = await http.get(`/user/blacklist/${id}`); // get user in black list
      let blackList = data.data[0].black_list;
      const newUserList = listUser?.filter(
        (user) =>
          !blackList.includes(user.id) && id.toString() != user.id.toString()
      ); // filter user in black list and self
      setListUsers(newUserList);
      setUserIdBlock(newUserList![0].id);
      setLoading(false);
    });
  };

  const unLikeHandle = async (): Promise<void> => {
    const id = JSON.parse(`${localStorage.getItem("user")}`).id;

    if (window.confirm("Bạn có chắc chắn không muốn thấy người này?")) {
      try {
        const res = await http.patch(`/user/update-black-list/${id}`, {
          black_list: userIdBlock,
        });
        console.log(res);
        if (res.status == 200) {
          const data = listUsers?.filter((user) => user.id !== userIdBlock);
          setListUsers(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const likeHandle = () => {
    console.log("Liked", userIdBlock);
  };

  const openNotification = () => {
    messageApi.open({
      type: "warning",
      content: "Nâng cấp tài khoản để sử dụng tính năng này",
      className: "custom-class",
      style: {
        marginTop: "8vh",
      },
    });
  };

  const onChange = () => {
    const elem = document
      .getElementsByClassName("slick-current")[0]
      .getElementsByTagName("section")[0].id;
    setUserIdBlock(elem);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        <MainLayout>
          {contextHolder}
          <section className={`${styleHome.home}`}>
            <Carousel
              dots={false}
              slidesToShow={1}
              afterChange={() => onChange()}
            >
              {listUsers?.map((item: any, index: number) => {
                return (
                  <section
                    className={styleHome.content}
                    id={item.id}
                    key={index}
                  >
                    <Image
                      src={`${item.avatar == "" ? avatar : item.avatar}`}
                      alt={""}
                    />
                    <section className={styleHome[`info--user`]}>
                      <Row className={styleHome[`info--detail`]}>
                        <Col span={21}>
                          <p>
                            {item.name}, {item.age}t
                          </p>
                          <section className={styleHome.info__distance}>
                            <Image src={LocationSvg.src} alt="path" />
                            <span>Cách {item.distance.toFixed(0)}m</span>
                          </section>
                        </Col>
                        <Col span={1}>
                          <HomeInfo user={item}></HomeInfo>
                        </Col>
                      </Row>
                    </section>
                  </section>
                );
              })}
            </Carousel>

            <section className={styleHome.buttons}>
              <Button
                icon={<UnlikeIcon />}
                shape="circle"
                onClick={() => unLikeHandle()}
              ></Button>
              <Button
                icon={<PremiumIcon />}
                shape="circle"
                onClick={() => openNotification()}
              ></Button>
              <Button
                shape="circle"
                icon={<HeartIcon />}
                onClick={() => likeHandle()}
              ></Button>
            </section>
          </section>
        </MainLayout>
      )}
    </>
  );
};

export default withAuth(HomePage);
