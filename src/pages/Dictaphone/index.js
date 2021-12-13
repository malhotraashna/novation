import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition, } from 'react-speech-recognition';
import { Form, AutoComplete, Space } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { getRecommendations } from '../../util';

const Dictaphone = ({ historyText, getSearchText, history, setHistory, token }) => {
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
      transcript && onFinish(transcript);
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
    setCharCounter(1);
    let updatedHistory;
    if (searchText) {
      getSearchText(searchText);
      updatedHistory = [...history, searchText];
    } else {
      getSearchText(values);
      updatedHistory = [...history, values];
    }
    const updatedHistoryString = JSON.stringify({ commands: updatedHistory });
    sessionStorage.setItem('commandHistory', updatedHistoryString);
    setHistory(updatedHistory);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSearch = async (searchText) => {
    if (!searchText || searchText.length <= 3) {
      setOptions([]);
    }
    if (charCounter % 3 === 0 && searchText.length) {
      const recommendations = await getRecommendations(searchText, token.username);
      setOptions(
        !searchText ? [] : recommendations
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

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
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
            {listening ? <AudioOutlined style={microphoneStyle} onClick={SpeechRecognition.stopListening} /> : <AudioMutedOutlined style={microphoneStyle} onClick={SpeechRecognition.startListening} />}
          </Space>
        </Form.Item>
      </Form>

    </div>
  );
};
export default Dictaphone;