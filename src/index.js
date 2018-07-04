import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';
import registerServiceWorker from './js/registerServiceWorker';
import './styles.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
