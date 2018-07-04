import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import '../../scss/components/Home.scss';

class Home extends Component {

	render() {
		return (
			<div className="home">				
				<div className="info">
					<div className="nhl-logo logo-bg--league-nhl"></div>
					<span>This is an excercise in React routing and connecting to the NHL Stats api which let's us search their player database, select a player and view a ton of information about them. Use the navbar below to get started!</span>
				</div>
			</div>
		);
	}
}

export default Home;