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

console.log(process.env.BACKEND_URL)
axios.defaults.baseURL = process.env.BACKEND_URL;

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store} >
    <React.StrictMode>
      <SocketProvider>
        <App />
      </SocketProvider>
    </React.StrictMode>
  </Provider>
)
