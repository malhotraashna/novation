import { Layout } from 'antd';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Container from './pages/Container';
import useAuthToken from './useAuthToken';
import LoginForm from './pages/LoginForm';

const { Header, Footer, Content } = Layout;

function MainContent(){
  const {token, setToken} = useAuthToken();

  if(!token){
    return <LoginForm  setToken={setToken} />
  }

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={ <Container />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</BrowserRouter>
}

function App() {
  return (
    <div className="app">
      <Layout>
        <Header className="header pilot-header">
          Model N Co-Pilot
        </Header>
        <Content className="site-layout" style={{ padding: '60px 50px' }}>
          <MainContent />
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default App;
