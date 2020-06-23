import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { List } from './list';

export const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact={true} path='/' component={List} />
			</Switch>
		</Router>
	);
};
