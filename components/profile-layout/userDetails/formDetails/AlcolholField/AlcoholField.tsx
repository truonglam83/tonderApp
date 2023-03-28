import React, { Dispatch, SetStateAction } from "react";
import { Select } from "antd";
import { RightOutlined } from "@ant-design/icons";

interface AlcoholFieldProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>
}


const AlcoholField: React.FC<AlcoholFieldProps> = ({ value, onChange }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            bordered={false}
            suffixIcon={<RightOutlined />}
            options={[
                { value: 'no', label: 'Không bao giờ' },
                { value: 'yes', label: 'Có uống' },
                { value: 'little', label: 'Uống chút đỉnh' },
                { value: 'tooMuch', label: 'Đô bất tử' },
            ]}
        />
    );
};

export default AlcoholField;
