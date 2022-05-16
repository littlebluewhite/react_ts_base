import React from 'react';
import ReactDOM from 'react-dom/client';
import {IndexMain} from "./component/indexMain";
import reportWebVitals from './reportWebVitals';
import "./generalScss/global.css";
import "./generalScss/svgContainer.css";
import "./generalScss/modelGeneral.css";
import "./generalScss/background.css";
import "./generalScss/arrow.css";
import "./generalScss/loading.css";
import "./generalScss/scrollBar.css";
import "./generalScss/input.css";
import "./generalScss/select.css";
import "./generalScss/button.css";


const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<IndexMain/>)

// If you want to start measuring performance in your app, pass a generalFunction
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
