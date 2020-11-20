import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.jpg';
import '../styles/static_pages.scss';

class Header extends Component {
  render() {
    return (
      <div className="main-div-static-page">
        <ul className="nav justify-content-end">
          <li className="nav-item mr-auto logo">
            <Link to = '/'>
              <img src={logo} alt="logo" />
            </Link>
          </li>
          <li className="nav-item non-border-link">
            <Link to = '/about_us' className='nav-link'>About us</Link>
          </li>
          <li className="nav-item non-border-link">
            <Link to = '#' className='nav-link'>Feed back</Link>
          </li>
          <li className="nav-item non-border-link">
            <Link to = '#' className='nav-link'>Help</Link>
          </li>
          <li className="nav-item border-link">
            <Link to = '/sign_up' className='nav-link'>Sign up</Link>
          </li>
          <li className="nav-item border-link">
            <Link to = '/sign_in' className='nav-link'>Sign in</Link>
          </li>
        </ul>
        <div className="div-slogan">
          <h1>
            <span>Be a better team!</span>
          </h1>
          <h2>
            <span>management, connection, sharing,...</span>
          </h2>
        </div>
        <div className="div-start-now-btn">
          <Link to = '#' className=''>Start now</Link>
        </div>
      </div>
    );
  }
}

export default Header;
