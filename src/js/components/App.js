import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
//import { subscribeToTimer } from './Api';


class App extends Component {

	render() {
		return (
			<div className="wrapper">
				<Navbar />
				<Main />
			</div>
		);
	}
}

export default withRouter(App);