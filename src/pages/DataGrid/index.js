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

  componentDidMount() {
    console.log('componentDidMount');
    const { pagination } = this.state;
  }

  handleTableChange = (pagination, filters, sorter) => {

  };

  render() {
    console.log('props:: ', this.props);
    const columns = [];
    this.props.data && this.props.data.length && this.props.data[0] &&
      Object.keys(this.props.data[0]).forEach((key, index) => {
        columns.push({
          title: constants[key],
          dataIndex: key,
          key: index,
        });
      });

    return (
      <Table
        columns={columns}
        rowKey={record => record.customer_oid + record.total_dollars}
        dataSource={this.props.data}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ y: 240 }}
      // loading={loading}
      // onChange={this.handleTableChange}
      />
      // <Table columns={columns} dataSource={data} pagination={{ pageSize: 50, showSizeChanger: false }} scroll={{ y: 240 }} />
    );
  }
}

export default DataGrid;