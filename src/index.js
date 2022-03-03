import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import themes from './themes';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={themes}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
