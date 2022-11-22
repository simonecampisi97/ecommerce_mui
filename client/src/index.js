import React from "react";
import ReactDom from 'react-dom/client'
import App from './App'

import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {theme} from "./theme";


const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>


    </React.StrictMode>
)