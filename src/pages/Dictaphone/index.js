import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition, } from 'react-speech-recognition';
import { Form, AutoComplete, Space } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { getRecommendations } from '../../util';

const Dictaphone = ({ getSearchText, history, setHistory }) => {
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [charCounter, setCharCounter] = useState(1);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    setSearchText(transcript);
    // setSearchText()
  }, [listening]);

  const microphoneStyle = {
    fontSize: '20px',
    color: '#33bbf0'
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    setCharCounter(1);
    getSearchText(searchText);
    const updatedHistory = [...history, searchText];
    const updatedHistoryString = JSON.stringify({ commands: updatedHistory });
    sessionStorage.setItem('commandHistory', updatedHistoryString);
    setHistory(updatedHistory);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSearch = async (searchText) => {
    if (!searchText || searchText.length <= 3) {
      console.log('>>>>');
      setOptions([]);
    }
    if (charCounter % 3 === 0 && searchText.length) {
      const recommendations = await getRecommendations(searchText);
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
    // resetTimeout();
    resetTranscript();
    console.log('>>>>>>>', data, '?????', listening);
    setSearchText(data);
  };

  const startListening = async () => {
    // resetTimeout();
    await SpeechRecognition.startListening();
    // updateSearchText();
    // setSearchText(transcript);
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
        // rules={[{ required: true, message: 'Please input your search text!' }]}
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