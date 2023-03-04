import React from "react";
import { Table } from "antd";

import "./FixMyTaxTable.less";

const FixMyTaxTable = (props) => {
  const { columns, dataSource } = props;
  return (
    <Table
      //   size="small"
      className={"fixmytax-table"}
      bordered={true}
      columns={columns}
      dataSource={dataSource}
      scroll={{ y: "calc(100vh - 220px)", x: 1000 }}
      {...props}
    />
  );
};

export default FixMyTaxTable;
