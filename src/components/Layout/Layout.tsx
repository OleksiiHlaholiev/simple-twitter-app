import React from "react";
import {Container, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";

export const Layout = () => {
    const isAuth = true; // TODO the logic
    const location = useLocation();
    console.log({location});

    return (
        <>
            <Container maxWidth="sm" className="App">
                <h1>Layout Page</h1>

                <Outlet />

                {isAuth && (
                    <List component="nav" style={{display: 'flex', marginTop: '30px'}}>
                        <ListItemButton component={NavLink}
                                        to={ROUTES_PATH.home}
                                        selected={true}
                        >
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Home'}/>
                        </ListItemButton>

                        <ListItemButton component={NavLink}
                                        to={ROUTES_PATH.settings}
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