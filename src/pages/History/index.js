import React from "react";
import { Popover, Button } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';

const History = () => {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div className="container-div">
      <Popover placement="rightBottom" content={content} title="Command History">
        <QuestionCircleFilled style={{ fontSize: '5vw', color: '#33bbf0' }} />
      </Popover>
    </div>
  );
};

export default History;