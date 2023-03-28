import formStyle from "../formDetails.module.scss";
import Image, { StaticImageData } from "next/image";
import { Form } from "antd";

export interface ISelectForm {
    image: StaticImageData | string;
    title: string;
    value: string | number | boolean | undefined;
    children: any;
    name: string;
}

const SelectForm = ({ value, image, title, children, name }: ISelectForm) => {
    return (
        <div className={formStyle["form__item"]}>
            <div>
                <Image src={image} alt={`${title}`} /> <span>{title}</span>
            </div>
            <Form.Item name={name} className={formStyle["form__item--detail"]} initialValue={value}>
                {children}
            </Form.Item>
        </div>
    );
};

export default SelectForm;
