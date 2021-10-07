import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Page from './layout/TopNavPop';

export default function App() {
	return (
		<div className='app'>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Dashboard} />
					{/* <Route exact path='/page' component={Page} /> */}
				</Switch>
			</BrowserRouter>
		</div>
	);
}
