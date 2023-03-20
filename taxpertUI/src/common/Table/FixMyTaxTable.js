import React from "react";
import { Table } from "antd";

import "./FixMyTaxTable.less";
import { useState } from "react";

const FixMyTaxTable = (props) => {
  const { columns, dataSource, loading = false } = props;

  const [pageState, setPageState] = useState({
    data: [],
    totalPages: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    if (dataSource) {
      setPageState({
        data: dataSource,
        totalPage: dataSource.length / pageState.pageSize,
        minIndex: 0,
        maxIndex: pageState.pageSize,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);
  return (
    <Table
      className={"fixmytax-table"}
      bordered={true}
      columns={columns}
      dataSource={dataSource}
      scroll={{ y: "calc(100vh - 220px)", x: 1000 }}
      loading={loading}
      pagination={{
        current: pageState.current,
        showSizeChanger: true,
        pageSize: pageState.pageSize,
        pageSizeOptions: [5, 10, 20, 50, 100],
        total: pageState.totalPages,
        size: "default",

        onChange: (page, pageSize) => {
          setPageState((prevState) => ({
            ...prevState,
            pageSize: pageSize,
            current: page,
          }));
        },
      }}
      {...props}
    />
  );
};

export default FixMyTaxTable;
