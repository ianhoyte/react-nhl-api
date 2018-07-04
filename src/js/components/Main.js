import React, { Component } from 'react';
import { RouteTransition } from 'react-router-transition';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Player from './Player';
import PlayerSearch from './PlayerSearch';

class Main extends Component {

  render() {
    return (
    	<div className="wrapper">
			<Route render={({location, history, match}) => {
			    return (
			      <RouteTransition 
			      	//https://github.com/maisano/react-router-transition
			        pathname={location.pathname}
			        atEnter={{ opacity: 0 }}
			        atLeave={{ opacity: 0 }}
			        atActive={{ opacity: 1 }}
			        className={'fade-container'}
			      >
			        <Switch key={location.key} location={location}>
			          <Route exact path='/' component={Home}/>
			          <Route path='/player' component={Player}/>
			          <Route path='/search' component={PlayerSearch}/>
			        </Switch>
			      </RouteTransition>
			    );
			  }} />
		</div>
    );
  }
}

export default Main;



