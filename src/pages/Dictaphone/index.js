import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import SpeechRecognition, { useSpeechRecognition, } from 'react-speech-recognition';
import { Form, AutoComplete, Space } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { getRecommendations } from '../../util';

const Dictaphone = ({ historyText, getSearchText, history, setHistory, token, setHistoryText }) => {
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [charCounter, setCharCounter] = useState(1);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (historyText) {
      setSearchText(historyText);
    } else {
      setSearchText(transcript);
      transcript && onFinish({ search: transcript });
    }
  }, [listening, historyText]);

  const microphoneStyle = {
    fontSize: '20px',
    color: '#33bbf0'
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const onFinish = (values) => {
    setHistoryText('');
    setOptions([]);
    setCharCounter(1);
    let updatedHistory = history;
    if (searchText) {
      getSearchText(searchText);
      if (!_.isEmpty(searchText)) {
        updatedHistory.push(searchText);
      }
    } else {
      getSearchText(values.search);
      if (values && values.search && !_.isEmpty(values.search)) {
        updatedHistory.push(values.search);
      }
    }
    const updatedHistoryString = JSON.stringify({ commands: updatedHistory });
    sessionStorage.setItem('commandHistory', updatedHistoryString);
    setHistory(updatedHistory);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSearch = async (searchingText) => {
    if (!searchingText || searchingText.length <= 3) {
      setOptions([]);
    }
    if (charCounter % 3 === 0 && searchingText.length) {
      const recommendations = await getRecommendations(searchingText, token.username);
      setOptions(
        !searchingText ? [] : recommendations
      );
      setCharCounter(1);
    } else {
      setCharCounter(charCounter + 1);
    }
  };

  const onSelect = (data) => {
    setSearchText(data);
    setCharCounter(3);
  };

  const onChange = (data) => {
    resetTranscript();
    setSearchText(data);
  };

  const startListening = () => {
    setHistoryText('');
    SpeechRecognition.startListening();
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        layout="inline"
      >
        <Form.Item
          name="search"
          required="true"
          style={{ width: '100%' }}
        >
          <Space>
            <AutoComplete
              options={options}
              onSelect={onSelect}
              onSearch={onSearch}
              onChange={onChange}
              placeholder="Search text"
              value={searchText}
              style={{ width: 500, border: '1px solid #33bbf0', borderRadius: '3px' }}
            />
            {listening ? <AudioOutlined style={microphoneStyle} onClick={SpeechRecognition.stopListening} /> : <AudioMutedOutlined style={microphoneStyle} onClick={startListening} />}
          </Space>
        </Form.Item>
      </Form>

    </div>
  );
};
export default Dictaphone;