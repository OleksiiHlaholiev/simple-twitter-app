import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import HomePage from "./components/HomePage";
import DetailPage from './components/DetailPage';
import SettingsPage from "./components/SettingsPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="detail" element={<DetailPage />} />
                    <Route path="setting" element={<SettingsPage />} />
                    <Route path="*" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
