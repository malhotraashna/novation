import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Row, Col, Divider, Empty, Spin } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Dictaphone from '../Dictaphone';
import DataGrid from '../DataGrid';
import History from '../History';
import PieChart from '../Pie';
import DoughnutChart from '../Doughnut';
import ScatterChart from '../Scatter';
import BarChart from '../Bar';
import { getSearchData } from '../../util';

const Container = ({ token }) => {
  const [historyText, setHistoryText] = useState();
  const [searchData, setSearchData] = useState({});
  const [history, setHistory] = useState([]);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const commandHistory = JSON.parse(sessionStorage.getItem('commandHistory'));
    setHistory((commandHistory && commandHistory.commands) || []);
  }, []);

  const getSearchTextResult = async (searchText) => {
    setSpinning(true);
    const res = await getSearchData(searchText, token.username);
    setSpinning(false);
    setSearchData(res);
  };

  const rerunHistory = (searchText) => {
    setHistoryText(searchText);
    getSearchTextResult(searchText);
  };

  return (
    <>
      <Row className="row">
        <Col className="col">
          <Dictaphone historyText={historyText} getSearchText={getSearchTextResult} history={history} setHistory={setHistory} token={token} />
        </Col>
      </Row>
      <Divider style={{ marginTop: '2%', marginBottom: '2%' }} />
      <Row justify='center' align="middle">
        <Spin spinning={spinning} />
        {
          spinning ?
            <div style={{ height: '200px' }}></div> :
            searchData.error ?
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={searchData.error} style={{ color: '#a30001' }} /> :
              searchData.type === 'grid' ?
                <Col span={24}>
                  <div>
                    {!_.isEmpty(searchData) && searchData.data.length ? <DataGrid data={searchData.data} /> : <div style={{ textAlign: 'center' }}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
                  </div>
                </Col> :
                searchData.type === 'pie' ?
                  <div className="d-chart"><PieChart data={searchData.data} /></div> :
                  searchData.type === 'donut' ?
                    <div className="d-chart"><DoughnutChart className="chart" data={searchData.data} /></div> :
                    searchData.type === 'scatter' ?
                      <div className="chart"><ScatterChart className="chart" data={searchData.data} /></div> :
                      searchData.type === 'bar' ?
                        <div className="chart"><BarChart className="chart" data={searchData.data} /></div> :
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </Row>
      <History data={history} rerunHistory={rerunHistory} />
    </>
  );
};

export default Container;