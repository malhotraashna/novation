import { Form, Input, Button, Alert, Row, Col } from 'antd';
import { useState } from 'react';

async function loginUser(credentials) {
    // send a hard coded user token
    const { username, password } = credentials;

    // hard coded list of users 
    const users = [
        { username: 'admin', password: 'admin', role: 'admin' },
        { username: 'user', password: 'user', role: 'user' }
    ];

    const found = users.find(user => {
        return username.toLowerCase() === user.username && password.toLowerCase() === user.password
    });

    if (found) {
        return ({
            token: 'test123',
            username: found.username,
            role: found.role
        });
    } else {
        throw Error('Invalid credentials.')
    }

    // TODO swap login with API call for our login api
    /* return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json()) */

    // or swap login handling with Single Sign on etc. 
    /*
    const oktaAuth = new OktaAuth({ url: baseUrl, issuer: issuer });
    oktaAuth.signIn({ username, password })
      .then(res => setSessionToken(res.sessionToken))
      .catch(err => setError(err));
    */
}

const LoginForm = ({ setToken }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await loginUser({
                username,
                password
            });
            setToken(token);
        } catch (err) {
            setError(err)
        }
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const errorAlert = error ? <Row>
        <Col span="8"></Col>
        <Col span="8">
            <Alert message="Authentication Failed" type="warning"></Alert>
        </Col>
    </Row> : ''

    return (
        <>
            <Row justify='center'>
                <Col span={18}>
                    <Form
                        {...layout}
                        onSubmit={handleSubmit}
                        style={{ padding: '50px', backgroundColor: '#fff' }}
                    >



                        <p style={{ textAlign: 'center' }}>Please Login with your Model N Co-Pilot Account</p>


                        <Form.Item
                            label="Username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                Login
                            </Button>
                        </Form.Item>

                        {errorAlert}

                    </Form>
                </Col>
            </Row>
        </>
    );
};
export default LoginForm;