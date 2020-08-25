import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
