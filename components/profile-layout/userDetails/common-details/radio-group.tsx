import React, { Dispatch, SetStateAction } from 'react'
import detailsStyle from '../userDetails.module.scss';
import Image, { StaticImageData } from "next/image";
import { Radio } from 'antd';

interface IRadioGroup {
    radioTitle: string;
    image: string | StaticImageData;
    radioSubTitle: string;
    value: string;
    setSubtitle: Dispatch<SetStateAction<string>>
}

const RadioGroup = ({ radioTitle, radioSubTitle, image, value, setSubtitle }: IRadioGroup) => {
    return (
        <div className={detailsStyle["choosing__item"]}>
            <Image className={detailsStyle["choosing_item--icon"]} src={image} alt="image-radio" />

            <div className={detailsStyle["choosing__item--details"]}>
                <div className={detailsStyle["choosing__item--details__title"]}>{radioTitle}</div>
                <div className={detailsStyle["choosing__item--details__body"]}>
                    {radioSubTitle}
                </div>
            </div>
            <Radio value={value} onChange={() => setSubtitle(radioTitle)} />
        </div>
    )
}

export default RadioGroup