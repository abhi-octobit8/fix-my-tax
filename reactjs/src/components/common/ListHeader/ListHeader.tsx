import React from 'react';
import { Col, Row } from 'antd';
const displayName = 'ListHeader';

export interface IListHeaderProps {
  leftContent?: string | JSX.Element;
  rightContent?: string | JSX.Element;
}

const ListHeader = (props: IListHeaderProps) => {
  return (
    <Row className={'list-header'} align="middle">
      <Col flex={1}>{props.leftContent}</Col>
      <Col>{props.rightContent}</Col>
    </Row>
  );
};
ListHeader.displayName = displayName;

export default ListHeader;
