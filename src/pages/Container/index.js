import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Dictaphone from '../Dictaphone';
import DataGrid from '../DataGrid';
import History from '../History';
import PieChart from '../Pie';
import DoughnutChart from '../Doughnut';
import ScatterChart from '../Scatter';
import { getSearchData } from '../../util';

const Container = () => {
  const [searchData, setSearchData] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const commandHistory = JSON.parse(sessionStorage.getItem('commandHistory'));
    setHistory((commandHistory && commandHistory.commands) || []);
  }, []);

  const getSearchText = async (searchText) => {
    const res = await getSearchData(searchText);
    console.log('data res:: ', res);
    setSearchData(res);
  };

  return (
    <>
      <Row className="row">
        <Col className="col">
          <Dictaphone getSearchText={getSearchText} history={history} setHistory={setHistory} />
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
      <Row justify='center'>
        <Col span={24}>
          <div>
            {!_.isEmpty(searchData) && searchData.data.length ? <DataGrid data={searchData.data} /> : <div style={{ textAlign: 'center' }}>No data</div>}
          </div>
        </Col>
        <PieChart />
        <DoughnutChart />
        <ScatterChart />
      </Row>
      <History data={history} />
    </>
  );
};

export default Container;