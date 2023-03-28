import React, { Dispatch, SetStateAction } from "react";
import { Select } from "antd";
import { RightOutlined } from "@ant-design/icons";

interface EducationFieldProps {
    value: string | undefined;
    onChange: Dispatch<SetStateAction<string | undefined>>
}


const EducationField: React.FC<EducationFieldProps> = ({ value, onChange }) => {
    return (
        <Select value={value}
            onChange={onChange}
            bordered={false}
            suffixIcon={<RightOutlined />}
            options={[
                { value: 'none', label: 'Không có' },
                { value: 'highSchool', label: 'Trung học' },
                { value: 'university', label: 'Đại học' },
                { value: 'graduated', label: 'Đã tốt nghiệp' },

            ]}
        />

    );
};

export default EducationField;
