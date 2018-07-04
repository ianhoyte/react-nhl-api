import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/Navbar.scss';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
      {
	        <span>
                <Link className="homeLink" to='/'>Home</Link>
                <Link className="playerLink" to='/search'>Search Player</Link>
          </span>
      }
      </nav>
    );
  }
}

export default Navbar;
