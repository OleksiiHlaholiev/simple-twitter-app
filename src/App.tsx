import React from 'react';
import './App.scss';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import HomePage from "./components/HomePage";
import DetailPage from './components/DetailPage';
import SettingsPage from "./components/SettingsPage";
import {ROUTES_PATH} from './constants';
import {useTypedSelector} from "./hooks/useTypedSelector";

const App = () => {
    const {isLoggedIn} = useTypedSelector(state => state.user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path={ROUTES_PATH.login} element={<LoginPage/>}/>

                    {isLoggedIn ? (
                        <>
                            <Route index path={ROUTES_PATH.home} element={<HomePage/>}/>
                            <Route path={`${ROUTES_PATH.detail}/:id`} element={<DetailPage/>}/>
                            <Route path={ROUTES_PATH.settings} element={<SettingsPage/>}/>
                        </>
                    ) : (
                        <>
                            <Route index element={<Navigate to={ROUTES_PATH.login} replace/>}/>
                        </>
                    )}

                    <Route path="*" element={<Navigate to={ROUTES_PATH.login} replace/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
