import React, { Component } from 'react';
import PlayerSummary from './PlayerSummary';
import '../../scss/components/PlayerSearch.scss';

var helpers = require('../utils/ajax_helpers');

class PlayerSearch extends Component {

	constructor(props) {
		super(props);
		// set default states
		this.state = {
			suggestions: <span className="initial">Type at least 3 letters to search.</span>
		};

	}

	/**
	 *	Use the api endpoint to grab results from our search query
	 */
	getPlayersAjax(input) {

		helpers.getPlayersFromSearchSuggestions( input ).then(function(data){

			let playersArray = [];
			// Loop through the API's suggestions, then set states
			Object.keys(data.suggestions).forEach(key => {

				// Format results: suggestions returned as a long string in each key value, if this changes, this will probably break...
			    var searchResult = data.suggestions[key].split('|')

			    // Setup the Players array for display
			    playersArray.push({
			    	id:searchResult[0],
			    	lname:searchResult[1],
			    	fname:searchResult[2],
			    	teamPosition: searchResult[11] + ' - ' + searchResult[12]
			    })

			});

			if (playersArray.length > 0) {
				var finalArray = playersArray.map((playersArray) =>
					<PlayerSummary key={playersArray['id']} id={playersArray['id']} fname={playersArray['fname']} lname={playersArray['lname']} teamPosition={playersArray['teamPosition']}></PlayerSummary>
				);
			} else {
				finalArray = <span className="initial">No Players Found. Refine your search!</span>
			}
		
			// set states for data display
			this.setState({
				suggestions: finalArray,
			})

		}
		.bind(this))
	}

	/**
	 *	Returns the search bar to its initial, empty state
	 */
	getInitialState() {
			this.setState({
				suggestions: <span className="initial">Type at least 3 letters to search.</span>
			})
	}
	/**
	 *	on change event to fire the api request, if we've typed more than 2 characters (more characters returns a ton of results and lots of requests)
	 */
	onChange(event) {
		if (event.target.value.length > 2) {
			this.getPlayersAjax(event.target.value);
		} else {
			this.getInitialState()
		}
		
	}

	render() {
		return (
			<div className="player-search">				
				<div className="info">
					<form className="playersearch">
						<input autoComplete="off" id="player" type="text" name="player" onChange={this.onChange.bind(this)} placeholder="Search By Player Name" />
					</form>
					<ul className="player-list">
						{this.state.suggestions}
					</ul>
				</div>
			</div>
		);
	}
}

export default PlayerSearch;