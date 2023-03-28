import { Typography } from "antd";
import Image, { StaticImageData } from "next/image";
import style from "./infoItem.module.scss";
import loveIcon from "../../../../public/icons/loveIcon.svg";
import arrowRight from "../../../../public/icons/arrowRight.svg";

type Props = {
  image: StaticImageData;
  name: string;
  interval: string;
};
function InfoItem({ image, name, interval }: Props) {
  return (
    <div className={style.info__item}>
      <div className={style.avatar__wrap}>
        <Image className={style.avatar} src={image} alt="Avatar" />
        <Image className={style.loveIcon} alt="loveIcon" src={loveIcon} />
      </div>
      <div className={style.infomation__wrap}>
        <Typography.Title className={style.name}>{name}</Typography.Title>
        <Typography.Text className={style.status}>
          Đã kết đôi {interval} tuần trước
        </Typography.Text>
      </div>
      <Image
        className={style.arrowRight}
        alt="arrowRightIcon"
        src={arrowRight}
      />
    </div>
  );
}

export default InfoItem;
