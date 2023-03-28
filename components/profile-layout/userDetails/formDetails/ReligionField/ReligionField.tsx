import React, { Dispatch, SetStateAction } from "react";
import { Checkbox, Select } from "antd";
import { RightOutlined } from "@ant-design/icons";

interface ReligionFieldProps {
    value: boolean;
    onChange: Dispatch<SetStateAction<boolean>>
}


const ReligionField: React.FC<ReligionFieldProps> = ({ value, onChange }) => {
    return (
        <Select value={value}
            onChange={onChange}
            bordered={false}
            suffixIcon={<RightOutlined />}
            options={[
                { value: true, label: 'Có' },
                { value: false, label: 'Không' },
            ]}
        />

    );
};

export default ReligionField;
