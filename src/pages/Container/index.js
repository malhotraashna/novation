import React from 'react';
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Dictaphone from '../Dictaphone';

const Container = () => {
  return (
    <>
      <Row className="row">
        <Col className="col">
          <Dictaphone />
        </Col>
      </Row>
      <Divider />
      <Row className="content-row">
        <Col span={16}>Main</Col>
        <Col span={8}>Sider</Col>
      </Row>
    </>
  );
};

export default Container;