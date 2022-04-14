import React from 'react';
import ReactDOM from 'react-dom/client';
import {IndexMain} from "./component/indexMain";
import reportWebVitals from './reportWebVitals';
import "./scss/global.css";
import "./scss/general/svgContainer.css";
import "./scss/model/modelGeneral.css";
import "./scss/general/background.css";
import "./scss/general/arrow.css";
import "./scss/general/loading.css";
import "./scss/general/scrollBar.css";
import "./scss/general/input.css";
import "./scss/general/select.css";
import "./scss/general/button.css";


const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<IndexMain/>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
