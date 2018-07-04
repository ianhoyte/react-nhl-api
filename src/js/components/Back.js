import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
//import '../../scss/components/Back.scss';

class BackButton extends Component {

	backEvent() {

		// check if we're at the top level
		var path = this.props.history.location.pathname;
		if (path !== '/') {
			this.props.history.goBack()
		}

	}

	render() {
		return (
		    <button className="back-button" onClick={(e) => this.backEvent(e)}>
			  	<i className="icon-chevron-thin-left"></i>
			  	<span className="back-text">BACK</span>
			</button>
		);
	}

}

export default withRouter(BackButton);