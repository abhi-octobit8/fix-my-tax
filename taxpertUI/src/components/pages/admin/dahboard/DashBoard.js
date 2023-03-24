import React from "react";
import { Card } from "antd";
import { ClusterOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";

import "./DashBoard.less";

const DashBoard = () => {
  return (
    <Card className="dashboard-card-container">
      <ListHeader leftContent={<h2>DashBoard</h2>}></ListHeader>

      <div className="content-padding dashboard-card-content">
        {" "}
        <ClusterOutlined />
        Coming Soon
      </div>
    </Card>
  );
};

export default DashBoard;
