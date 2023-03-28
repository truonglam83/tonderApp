import { Select } from "antd";
import React from "react";
import { RightOutlined } from "@ant-design/icons";

interface ChildrenFieldProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

const { Option } = Select;

const ChildrenField: React.FC<ChildrenFieldProps> = ({ value, onChange }) => {
    return (
        <Select value={value} onChange={onChange} bordered={false} suffixIcon={<RightOutlined />}>
            <Option value={true}>Đã có</Option>
            <Option value={false}>Chưa có</Option>
        </Select>
    );
};

export default ChildrenField;
