import React from 'react'
import ReactDOM from 'react-dom/client'
import "antd/dist/reset.css";
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from 'axios';
import App from './App.jsx';


axios.defaults.baseURL = 'http://localhost:8080';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>
)
