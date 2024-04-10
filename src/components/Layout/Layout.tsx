import React from "react";
import {Container} from "@mui/material";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <Container maxWidth="sm">
                <h1>Layout Page</h1>

                <Outlet />
            </Container>
        </>
    )
};