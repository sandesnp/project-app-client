import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss';
import { Provider } from 'react-redux';
import Store from './redux/store';
import { getTimers } from './redux/timerSlice';

Store.dispatch(getTimers());

ReactDom.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
