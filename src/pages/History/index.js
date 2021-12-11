import React, { useState } from "react";
import { Popover, Button } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';

const History = ({ data, rerunHistory }) => {
  const [visible, setVisible] = useState(false);

  const rerunHistoryCommand = (e) => {
    rerunHistory(e.target.textContent);
    setVisible(false);
  };

  const handleVisibleChange = visible => {
    setVisible(visible);
  };

  let content = [];
  if (data && data.length) {
    content = data.map((command, index) => {
      return <Button className="history-link" type="link" block="true" onClick={rerunHistoryCommand} key={command + index}>{command}</Button>;
    });
  } else {
    content = <p>No History</p>;
  }

  return (
    <div className="container-div">
      <Popover
        placement="rightBottom"
        content={content}
        title="Command History"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <QuestionCircleFilled style={{ fontSize: '5vw', color: '#33bbf0' }} />
      </Popover>
    </div>
  );
};

export default History;