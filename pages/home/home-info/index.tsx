import { IUser } from "@/interface/user-interface";
import type { DrawerProps } from "antd";
import { Button, Drawer, Image } from "antd";
import { useEffect, useState } from "react";
import slideUp from "../../../public/images/home/down.svg";
import path from "../../../public/images/home/location.svg";
import homeImage from "../../../public/images/home/tesst.png";

import styles from "./homeInfo.module.scss";
import alcohol from "../../../public/images/home/alcohol.svg";
import child from "../../../public/images/home/child.svg";
import education from "../../../public/images/home/education.svg";
import gender from "../../../public/images/home/gender.svg";
import marriage from "../../../public/images/home/marriage.svg";
import { DownIcon, InfoIcon } from "@/components/main-layout/home/icon";

const colorHobby = ["#FFF0F0", "#EDF7FF", "#d9f7e6"];
const avatar =
  "https://inspektorat.mahakamulukab.go.id/assets/img/default/male.jpg";
interface IHome {
  user: IUser;
}

function HomeInfo({ user }: IHome) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] =
    useState<DrawerProps["placement"]>("bottom");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.home__drawer}>
      <Button shape="circle" onClick={showDrawer} icon={<InfoIcon />}></Button>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        height={"92%"}
        key={placement}
      >
        <div className={`${styles.home__info}`}>
          <section className={styles.buttonBack}>
            <Button
              shape="circle"
              onClick={onClose}
              icon={<DownIcon></DownIcon>}
            ></Button>
          </section>
          <section className={styles.info__image}>
            <Image
              className={styles.image__main}
              src={`${user.avatar == "" ? avatar : user.avatar}`}
              alt="home-image"
            />
          </section>
          <section className={styles.info__bio}>
            <p className={styles.bio__name}>{user.name}</p>
            <section className={styles.bio__distance}>
              <Image src={path.src} alt="path" />
              <span>Cách {user.distance && user.distance.toFixed(1)}m</span>
            </section>
            <div className={styles.bio__desc}>
              <p>&quot; {user.bio} &quot;</p>
            </div>
            <div className={styles.bio__fav}>
              <p className={styles.fav__title}>Thông tin của {user.name}</p>
              <p className={styles.fav__detail}>
                <Image src={alcohol.src} alt={`${alcohol}`} />
                <span>{user.alcohol}</span>
              </p>
              <p className={styles.fav__detail}>
                <Image src={child.src} alt={`${child}`} />
                <span>{user.children == true ? "yes" : "no"}</span>
              </p>
              <p className={styles.fav__detail}>
                <Image src={education.src} alt={`${path}`} />
                <span>{user.education}</span>
              </p>
              <p className={styles.fav__detail}>
                <Image src={marriage.src} alt={`${marriage}`} />
                <span>{user.marriage == true ? "yes" : "no"}</span>
              </p>
              <p className={styles.fav__detail}>
                <Image src={gender.src} alt={`${gender}`} />
                <span>{user.gender}</span>
              </p>
            </div>
            <div className={styles.bio__tags}>
              <p className={styles.tags__title}>Tôi thích ...</p>
              {user.hobbies?.map((hobby, index) => (
                <p
                  style={{
                    backgroundColor: `${
                      colorHobby[Math.floor(Math.random() * colorHobby.length)]
                    }`,
                  }}
                  key={index}
                  className={styles.tags__detail}
                >
                  <span># {hobby}</span>
                </p>
              ))}
            </div>
          </section>
          <section className={styles.info__photos}>
            {user.avatar && (
              <Image
                className={styles.image__main}
                src={user.avatar}
                alt="home-image"
              />
            )}
          </section>
        </div>
      </Drawer>
    </div>
  );
}

export default HomeInfo;
