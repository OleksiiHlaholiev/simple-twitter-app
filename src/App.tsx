import React from 'react';
import './App.scss';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Layout} from './layouts';
import {DetailPage, HomePage, LoginPage, SettingsPage} from "./pages";
import {ROUTES_PATH} from './constants';
import {useTypedSelector} from "./hooks";

export const App = () => {
    const {isLoggedIn} = useTypedSelector(state => state.user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<LoginPage/>}/>
                    <Route path={ROUTES_PATH.login} element={<LoginPage/>}/>

                    {isLoggedIn ? (
                        <>
                            <Route path={ROUTES_PATH.home} element={<HomePage/>}/>
                            <Route path={`${ROUTES_PATH.detail}/:id`} element={<DetailPage/>}/>
                            <Route path={ROUTES_PATH.settings} element={<SettingsPage/>}/>
                        </>
                    ) : (
                        <>
                            <Route element={<Navigate to={ROUTES_PATH.login} replace/>}/>
                        </>
                    )}

                    <Route path="*" element={<Navigate to={ROUTES_PATH.login} replace/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
