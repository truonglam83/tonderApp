import { Form } from "antd";
import React from "react";

type Props = {
    children: any;
    message?: string;
    name: string;
    initialValue?: string | null;
    label: string | null;
};

const FormItem = ({ name, children, message, initialValue, label }: Props) => {
    return (
        <Form.Item
            initialValue={initialValue}
            rules={[{ required: true, message: message }]}
            label={label}
            name={name}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
        >
            {children}
        </Form.Item>
    );
};

export default FormItem;
