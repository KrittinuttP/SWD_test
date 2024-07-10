import React from 'react';
import './App.css';
import { Button, Layout, Select } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import i18n from './i18n';
import MainLayout from './project/MainLayout';
import Mainpage from './project/Mainpage';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Page404 from './Page404';
import MainFrom from './project/MainFrom';

const { Header, Content } = Layout;

const App: React.FC<WithTranslation> = ({ t }) => {
  const location = useLocation();
  const { pathname } = location;


  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Layout>

      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h1 className="title">
          {pathname === '/' && t('title_home')}
          {pathname === '/layout' && t('title_layout')}
          {pathname === '/form' && t('title_form')}
        </h1>

        <div style={{ marginLeft: 'auto' }}>
          <Link to="/"><Button style={{ margin: 10 }}>Home</Button></Link>
          <Select
            defaultValue="en"
            style={{ width: 120 }}
            options={[
              { value: 'en', label: 'EN' },
              { value: 'th', label: 'ไทย' },
            ]}
            onChange={handleChangeLanguage}
          />
        </div>
      </Header>

      <Content style={{ padding: '0 48px' }}>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/layout" element={<MainLayout />} />
          <Route path="/form" element={<MainFrom />} />


          <Route path="*" element={<Page404 />} />
        </Routes>
      </Content>

    </Layout>
  );
};

export default withTranslation()(App);
