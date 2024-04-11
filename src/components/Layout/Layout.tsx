import React from "react";
import {Container, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const Layout = () => {
    const isAuth = true; // TODO the logic
    const location = useLocation();
    const currentPath = location.pathname;
    console.log({location});

    return (
        <section className="app">
            <div className="bg-cont">
                <div className="container">
                    <h1>Simple Twitter App!</h1>

                    <ToastContainer />

                    <Outlet />

                    {isAuth && (
                        <List component="nav" style={{display: 'flex', marginTop: '30px'}}>
                            <ListItemButton component={NavLink}
                                            to={ROUTES_PATH.home}
                                            selected={currentPath.includes(ROUTES_PATH.home)}
                            >
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Home'}/>
                            </ListItemButton>

                            <ListItemButton component={NavLink}
                                            to={ROUTES_PATH.settings}
                                            selected={currentPath.includes(ROUTES_PATH.settings)}
                            >
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Settings'}/>
                            </ListItemButton>
                        </List>
                    )}
                </div>
            </div>
        </section>
    )
};