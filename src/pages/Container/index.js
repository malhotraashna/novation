import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Row, Col, Divider, Empty } from 'antd';
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

const Container = () => {
  const [historyText, setHistoryText] = useState();
  const [searchData, setSearchData] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const commandHistory = JSON.parse(sessionStorage.getItem('commandHistory'));
    setHistory((commandHistory && commandHistory.commands) || []);
  }, []);

  const getSearchTextResult = async (searchText) => {
    const res = await getSearchData(searchText);
    console.log('data res:: ', res);
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
          <Dictaphone historyText={historyText} getSearchText={getSearchTextResult} history={history} setHistory={setHistory} />
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
      <Row justify='center'>
        {
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