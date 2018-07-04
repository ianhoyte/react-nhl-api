import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/PlayerSummary.scss';
import Skater from '../../img/skater.jpg';

class PlayerSummary extends Component {

	render() {

    	return (
			<li>
				<Link className="player-summary" to={'/player/'+this.props.id}>

					<div className="img-container">
						<img alt={this.props.fname + ' ' + this.props.lname} src={Skater}/>
						<img alt={this.props.fname + ' ' + this.props.lname} onError={(event)=>event.target.remove()} className="actual" src={'https://nhl.bamcontent.com/images/headshots/current/60x60/' + this.props.id + '@2x.jpg'} />
					</div>
					<div className="playerInfo">
						<span className="name">{this.props.fname + ' ' + this.props.lname}</span><span className="team-position">{this.props.teamPosition}</span>
					</div>
					
				</Link>
			</li>
	    );
    }
}

export default PlayerSummary;