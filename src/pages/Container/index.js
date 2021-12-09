import React from 'react';
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Dictaphone from '../Dictaphone';
import DataGrid from '../DataGrid';
import PieChart from '../Pie';
import DoughnutChart from '../Doughnut';

const Container = () => {
  return (
    <>
      <Row className="row">
        <Col className="col">
          <Dictaphone />
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
      <Row className="content-row">
        <Col span={16}>
          <DataGrid />
        </Col>
        <Col span={8}>
          <Row className="chart-row"><PieChart /></Row>
          <Row className="chart-row"><DoughnutChart /></Row>
        </Col>
      </Row>
    </>
  );
};

export default Container;