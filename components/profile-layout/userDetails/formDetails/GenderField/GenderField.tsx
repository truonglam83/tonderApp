import { RightOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface GenderFieldProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>
}


const GenderField: React.FC<GenderFieldProps> = ({ value, onChange }) => {
    return (
        <Select value={value}
            onChange={onChange}
            bordered={false}
            suffixIcon={<RightOutlined />}
            options={[
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
                { value: 'other', label: 'Làng Gốm Bát Tràng' }
            ]}
        />

    );
};

export default GenderField;
