import React, { useState } from 'react';
import _ from 'lodash';
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Dictaphone from '../Dictaphone';
import DataGrid from '../DataGrid';
import PieChart from '../Pie';
import DoughnutChart from '../Doughnut';
import { getSearchData } from '../../util';

const Container = () => {
  const [searchData, setSearchData] = useState({});

  const getSearchText = async (searchText) => {
    const res = await getSearchData(searchText);
    console.log('data res:: ', res);
    setSearchData(res);
  };

  return (
    <>
      <Row className="row">
        <Col className="col">
          <Dictaphone getSearchText={getSearchText} />
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
      <Row className="content-row">
        <Col className="col">
          {searchData.length ? <DataGrid data={searchData} /> : 'No Data'}
        </Col>
        {/* <Col span={8}>
          <Row className="chart-row"><PieChart /></Row>
          <Row className="chart-row"><DoughnutChart /></Row>
        </Col> */}
      </Row>
    </>
  );
};

export default Container;