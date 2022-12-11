import React from "react";
import { Col, Row } from "antd";
import "./ListHeader.less";

const ListHeader = ({ ...props }) => {
  return (
    <div className={"list-header"} style={props.style}>
      <Row align="middle">
        <Col flex={1}>{props.leftContent}</Col>
        <Col>{props.rightContent}</Col>
      </Row>
    </div>
  );
};

export default ListHeader;
