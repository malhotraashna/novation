import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import constants from '../../util/constants';

class DataGrid extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  };

  compare(a, b) {
    if (a.sortOrder < b.sortOrder) {
      return -1;
    }
    if (a.sortOrder > b.sortOrder) {
      return 1;
    }
    return 0;
  }

  render() {
    const columns = [];
    this.props.data && this.props.data.length && this.props.data[0] &&
      Object.keys(this.props.data[0]).forEach((key, index) => {
        if (constants[key]) {
          columns.push({
            title: constants[key].value,
            dataIndex: key,
            key: index,
            sortOrder: constants[key].sortOrder,
          });
        }
      });
    columns.sort(this.compare);

    return (
      <Table
        columns={columns}
        rowKey={record => record.oid}
        dataSource={this.props.data}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ y: 240 }}
      />
    );
  }
}

export default DataGrid;