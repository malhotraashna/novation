import { Layout } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Container from './pages/Container';
import useAuthToken from './useAuthToken';
import LoginForm from './pages/LoginForm';

const { Header, Footer, Content } = Layout;

function MainContent() {
  const { token, setToken } = useAuthToken();

  if (!token) {
    return <div style={{ paddingTop: 60 }}><LoginForm setToken={setToken} /></div>
  }

  return <div style={{ backgroundColor: '#fff', padding: 30 }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </div>
}

function App() {
  return (
    <div className="app">
      <Layout>
        <Header>Model N Co-Pilot</Header>
        <Content className="site-layout-content" style={{ padding: '60px 50px', paddingTop: 0 }}>
          <Layout style={{ padding: 50, paddingTop: 100 }}>
            <MainContent />
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Model N Co-Pilot &copy; 2021</Footer>
      </Layout>
    </div>
  );
}

export default App;
