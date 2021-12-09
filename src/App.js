import { Layout } from 'antd';
import './App.css';
import Container from './pages/Container';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="app">
      <Layout>
        <Header className="header pilot-header">
          Model N Co-Pilot
        </Header>
        <Content className="site-layout" style={{ padding: '60px 50px' }}>
          <Container />
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default App;
