import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';
import './css/bootstrap.min.css';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale("pt-BR");
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
