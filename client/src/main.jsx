import React from 'react'
import ReactDOM from 'react-dom/client'
import "antd/dist/reset.css";
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from 'axios';
import App from './App.jsx';
import "./styles/test.css"
import SocketProvider from './context/SocketProvider.jsx';
// http://localhost:8080
// https://my-medicare-backend.onrender.com
axios.defaults.baseURL = 'https://my-medicare-backend.onrender.com';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store} >
    <React.StrictMode>
      <SocketProvider>
        <App />
      </SocketProvider>
    </React.StrictMode>
  </Provider>
)
