import React from "react";
import {Container, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
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
        <>
            <Container maxWidth="sm" className="App">
                <h1>Layout Page</h1>

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
                                <SettingsApplicationsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Settings'}/>
                        </ListItemButton>
                    </List>
                )}
            </Container>
        </>
    )
};