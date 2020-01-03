import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/containers/App.jsx';
import { Router, Route, Link , browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore'

const store = configureStore();
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));
