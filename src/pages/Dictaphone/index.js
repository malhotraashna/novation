import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition, } from 'react-speech-recognition';
import { Form, Button, AutoComplete, Space } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Dictaphone = () => {
  let timeoutId;
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    updateSearchText();
    // setSearchText()
  }, [listening]);

  const microphoneStyle = {
    fontSize: '20px',
    color: '#33bbf0'
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const updateSearchText = () => {
    //timeoutId = setTimeout(() => {
      // console.log('listening::', listening);
      // console.log('searchText:: ', searchText);
      // console.log('transcript:: ', finalTranscript);
      console.log(searchText !== finalTranscript);
      /* if (listening && searchText !== finalTranscript) {
        setSearchText(transcript);
      } */
      setSearchText(transcript);
      //updateSearchText();
    //}, 100);
  };
  /*
  const resetTimeout = () => {
    clearTimeout(timeoutId);
  };
  */

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
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
    updateSearchText();
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
          rules={[{ required: true, message: 'Please input your search text!' }]}
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