import { Space, Spin } from "antd";
import React from "react";

const Loading: React.FC = () => (
    <Spin tip="Loading" size="large">
        <div className="content" />
    </Spin>
);

export default Loading;
