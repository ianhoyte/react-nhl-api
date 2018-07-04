import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../scss/components/Player.scss';
import Skater2x from '../../img/skater@2x.jpg';
import LoadingIcon from '../../img/ball-triangle.svg';

var helpers = require('../utils/ajax_helpers');

class Player extends Component {

	constructor(props) {
		super(props);
		// set default states
		this.state = {
			people: [],
            id: null,
            fullName: null,
            primaryPosition: null,
            primaryNumber: null,
            currentTeam: [],
            stats: [],
            season: null,
            games:null,
            // skater stats
			goals: null,
            assists: null,
            points: null,
            blocked: null,
            pim: null,
            hits: null,
            shots: null,
			plusMinus: null,
			powerPlayGoals: null,
			powerPlayPoints: null,
			shortHandedGoals: null,
			shortHandedPoints: null,
			gameWinningGoals: null,
			overTimeGoals: null,
			shotPct: null,
			faceOffPct: null,
			// goalie stats
			gamesStarted: null,
			wins: null,
			losses: null,
			ties: null,
			ot: null,
			saves: null,
			goalsAgainst: null,
			goalAgainstAverage: null,
			savePercentage: null,
			shutouts: null,
			// loading state
			isLoading: true,
			showStats: false
		};

	}

	componentDidMount() {

	    // get location from url and format, assign to variable for ajax call
		let path = this.props.location.pathname,
			playerUrl = path.replace('/player/', ''),
			playerID = playerUrl.replace('/', '')

		// use pathname for ajax call
	    helpers.getPlayerDetails( playerID ) 
			.then(function(data){

				/**
				 *	Flip the statsArray order, then get the first season.
				 *	We do this so we can get the most recent season without
				 *	having to loop through the entire array to fetch the final entry
				 */
				let statsArray = data.stats.reverse(),
					season = statsArray[0]['season'];

				// set states for data display
				this.setState({
	                id: data.id,
	                fullName: data.fullName,
	                primaryPosition: data.primaryPosition,
	                primaryNumber: data.primaryNumber,
	                currentTeamName: data.currentTeamName,
	                currentTeamId: data.currentTeamId,
	                stats: statsArray,
	                season: season
				})

				this.generateStats(this.state.stats, this.state.season)

				let selectSeasons = [];

				// Loop through the season array
				Object.keys(statsArray).forEach(key => {

				    let seasonItem = statsArray[key]['season'],
				    	league = statsArray[key]['league'];

				    if ( league['id'] === 133 ) { // NHL league ID

						this.setState({
							hasNHLStats: true
						})

						// This might cause a bit of a bug, if players are traded half way through, only one of their teams' stats will display...
						selectSeasons.push({
							seasonformatted: seasonItem.replace(/^(.{4})(.*)$/, "$1 / $2"),
							season: seasonItem
						})
				    }

				});

				if (selectSeasons.length > 0) {
					// setup the select field options
					var finalSelectSeasons = selectSeasons.map((selectSeasons, i) =>
						<option key={i} value={selectSeasons['season']} >
							{selectSeasons['seasonformatted']}
						</option>
					);
				}

				this.setState({
					selectSeasons: finalSelectSeasons,
					isLoading: false,
					showStats:'show'
				})
				
				/*
				Schedule stuff
				helpers.getTeamSchedule( this.state.currentTeamId ).then(function(data) {

					this.setState({
						dates: data
					})

				}.bind(this))
				*/

			}.bind(this))

 	}

	/**
	 *	Determine if we're looking at a goalie or a skater. Render a different stats table for each.
	 */
 	skaterOrGoalie(playerPosition) {

 		if (playerPosition !== 'G') {

	 		return (
		 		<tbody>
					<tr>
						<th>GP</th>
						<th>G</th>
						<th>A</th>
						<th>P</th>
						<th>HIT</th>
						<th>BLK</th>
						<th>PIM</th>
						<th>SOG</th>
						<th>+/-</th>
						<th>PPG</th>
						<th>PPP</th>
						<th>SHG</th>
						<th>SHP</th>
						<th>GWG</th>
						<th>OTG</th>
						<th>S%</th>
						<th>FO%</th>
					</tr>
					<tr>
						<td>{this.state.games}</td>
						<td>{this.state.goals}</td>
						<td>{this.state.assists}</td>
						<td>{this.state.points}</td>
						<td>{this.state.hits}</td>
						<td>{this.state.blocked}</td>
						<td>{this.state.pim}</td>
						<td>{this.state.shots}</td>
						<td>{this.state.plusMinus}</td>
						<td>{this.state.powerPlayGoals}</td>
						<td>{this.state.powerPlayPoints}</td>
						<td>{this.state.shortHandedGoals}</td>
						<td>{this.state.shortHandedPoints}</td>
						<td>{this.state.gameWinningGoals}</td>
						<td>{this.state.overTimeGoals}</td>
						<td>{this.state.shotPct}</td>
						<td>{this.state.faceOffPct}</td>
					</tr>
				</tbody>
			)
		} else {

			return (
				<tbody>
					<tr>
						<th>GP</th>
						<th>GS</th>
						<th>W</th>
						<th>L</th>
						<th>T</th>
						<th>OT</th>
						<th>SA</th>
						<th>GA</th>
						<th>GAA</th>
						<th>Sv%</th>
						<th>SO</th>
					</tr>
					<tr>
						<td>{this.state.games}</td>
						<td>{this.state.gamesStarted}</td>
						<td>{this.state.wins}</td>
						<td>{this.state.losses}</td>
						<td>{this.state.ties}</td>
						<td>{this.state.ot}</td>
						<td>{this.state.saves}</td>
						<td>{this.state.goalsAgainst}</td>
						<td>{this.state.goalAgainstAverage}</td>
						<td>{this.state.savePercentage}</td>
						<td>{this.state.shutouts}</td>
					</tr>
				</tbody>
			)

		}

 	}

	/**
	 *	Functionality for the dropdown when the stats season is changed
	 */
	updateSeason(event) {
		let stats = this.state.stats

		this.setState({
			seasons: event.target.value,
		})

		this.generateStats(stats, event.target.value)

	}

	/**
	 *	Display scheduled games.
	 */

/*	displayGamesList() {

		var dateData = this.state.dates
		if (dateData) {
			var upcomingdates = []

			let dates = dateData['dates'].reverse()

			Object.keys(dates).forEach(key => {

				let date = dates[key]['date'];

				console.log(date)

				let dateObject = new Date(date),
				    locale = "en-us",
				    month = date.toLocaleString(locale, { month: "long"});
				
				let dateString = dateObject.toString();
				
				let weekday = dateString.split(' ').slice(0, -8).join(' ');
				let month = dateString.split(' ').slice(1, -7).join(' ');
				let day = dateString.split(' ').slice(2, -6).join(' ')

				let home = dates[key]['games'][0]['teams']['home']['team']['name'];
				let away = dates[key]['games'][0]['teams']['away']['team']['name'];
				

				//var dateFormatting = '<div class="date"><span class="month">'+month+'</span><span class="day">'+day+'</span><span class="weekday">'+weekday+'</span></div>'
				let dateFormatting = '<div class="date">'+date+'</div>';

				upcomingdates.push (
					['<li>'+dateFormatting+'<div class="home"><span class="title">Home</span><span class="text">'+home+'</span></div>'+'<div class="away"><span class="title">Away</span><span class="text">'+away+'</span></div></li>']
				)


				
			});

			let newDates = upcomingdates.toString();
			return newDates.replace(/,/g , "");
		}
	}*/

	/**
	 *	Generate the stats for table render
	 */
 	generateStats(stats, season) {
 		//console.log(stats);
		Object.keys(stats).forEach(key => {

			let league = stats[key]['league']

			if ( league['id'] === 133 ) { // This is the NHL's league ID, according to their API

				if (stats[key]['season'] === season) {
					//console.log(stats[key])
					this.setState({
						goals: stats[key]['stat']['goals'],
			            assists: stats[key]['stat']['assists'],
			            points: stats[key]['stat']['points'],
			            blocked: stats[key]['stat']['blocked'],
			            pim: stats[key]['stat']['pim'],
			            hits: stats[key]['stat']['hits'],
			            shots: stats[key]['stat']['shots'],
			            games: stats[key]['stat']['games'],
						plusMinus: stats[key]['stat']['plusMinus'],
						powerPlayGoals: stats[key]['stat']['powerPlayGoals'],
						powerPlayPoints: stats[key]['stat']['powerPlayPoints'],
						shortHandedGoals: stats[key]['stat']['shortHandedGoals'],
						shortHandedPoints: stats[key]['stat']['shortHandedPoints'],
						gameWinningGoals: stats[key]['stat']['gameWinningGoals'],
						overTimeGoals: stats[key]['stat']['overTimeGoals'],
						shotPct: stats[key]['stat']['shotPct'],
						faceOffPct: stats[key]['stat']['faceOffPct'],
						season:season,
						seasonformatted: season.replace(/^(.{4})(.*)$/, "$1 / $2"),
						//goalie stats
						gamesStarted: stats[key]['stat']['gamesStarted'],
						wins: stats[key]['stat']['wins'],
						losses: stats[key]['stat']['losses'],
						ties: stats[key]['stat']['ties'],
						ot: stats[key]['stat']['ot'],
						saves: stats[key]['stat']['saves'],
						goalsAgainst: stats[key]['stat']['goalsAgainst'],
						goalAgainstAverage: stats[key]['stat']['goalAgainstAverage'],
						savePercentage: stats[key]['stat']['savePercentage'],
						shutouts: stats[key]['stat']['shutouts'],
					})
				}
			}
		});
 	}
	/**
	 *	Render the stats table
	 */
 	renderTable() {
 		if (this.state.hasNHLStats) {
			return (
				<div className="stats">
					<h3>{this.state.fullName} Career Statistics</h3>
					<form>
						<select onChange={this.updateSeason.bind(this)}>
							{this.state.selectSeasons}
						</select>
					</form>
					<div className="stats-container">
						<div className="season-heading">
							<span className="season-title">Season</span>
							<span className="season">{this.state.seasonformatted}</span>
						</div>
						<div className="table-container">
							<table className="stats-table">
								{ this.skaterOrGoalie(this.state.primaryPosition) }
							</table>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="stats">
					No NHL Stats Found for {this.state.fullName}
				</div>
			)
		}
 	}


	render() {

		if (this.state.isLoading) {
			return (
				<div className="loading">
					<img src={LoadingIcon} alt="Loading" />
				</div>
			);
		} else {
	    	return (
				<div className="player">
					<h2>{this.state.fullName}</h2>
					{/*<ul className="upcoming-games" dangerouslySetInnerHTML={{__html: this.displayGamesList()}} />*/}
					<div className="header">
						<img alt={this.state.fullName} onError={(event)=>event.target.setAttribute('src','https://nhl.bamcontent.com/images/arena/default/' + this.state.currentTeamId + '.jpg')} src={'https://nhl.bamcontent.com/images/actionshots/' + this.state.id + '.jpg'} />
					</div>
					<div className="info">
						<div className="left">
							<div className="property-details">
									
								<ul className={this.state.showStats}>
									<li>
										<div className="img-container">
											<img alt={this.state.fullName} src={Skater2x}/>
											<img alt={this.state.fullName} className="actual" src={'https://nhl.bamcontent.com/images/headshots/current/168x168/'+this.state.id+'@2x.jpg'} />
										</div>
									</li>
									<li>{this.state.primaryPosition}</li>
									<li>{this.state.primaryNumber}</li>
									<li>{this.state.currentTeamName}</li>
									<li><span className={'team-logo logo-bg-dark--team-' + this.state.currentTeamId}></span></li>
								</ul>
								{this.renderTable()}
							</div>
						</div>

					</div>

				</div>
		    )
	    }
    }
}

export default withRouter(Player);