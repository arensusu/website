import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

export default function Header() {
  return (
    <div className='header'>
      <nav>
        <div className="navbar-logo">
          <Link to="/">
            My Website
          </Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/about">About Me</Link>
          </li>
          <li>
            <Link to="/timer">Timer</Link>
          </li>
          <li>
            <Link to="/bookkeeping">Bookkeeping</Link>
          </li>
          <li>
            <Link to="/">Web3</Link>
          </li>
        </ul>
      </nav>
      <div className='fill-gap'></div>
    </div>
  );
}
