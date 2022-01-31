import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root";
import './index.css';
import axios from "axios";
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore({});

  const root = document.getElementById('root');

  ReactDOM.render(<Root store = {store} />, root)

})

window.axios = axios;

