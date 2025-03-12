import React, {FC} from "react";
import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useTypedSelector} from "../../hooks";


export const Layout: FC = () => {
    const {isLoggedIn} = useTypedSelector(state => state.user);
    const location = useLocation();
    const currentPath = location.pathname;
    console.log({location});

    return (
        <section className="app">
            <div className="container">
                <h1>Simple Twitter App!</h1>

                <ToastContainer/>

                <Outlet/>

                {isLoggedIn && (
                    <footer className='app-footer'>
                        <List component="nav"
                              className='footer-nav'
                        >
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
                    </footer>
                )}
            </div>
        </section>
    )
};