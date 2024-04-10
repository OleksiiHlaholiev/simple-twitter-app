import React from 'react';
import './App.scss';
import LoginPage from './components/LoginPage';
import {Container} from "@mui/material";

function App() {
  return (
      <Container maxWidth="sm">
        <LoginPage />
      </Container>
  );
}

export default App;
