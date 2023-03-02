import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

export default function Header() {
  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">
          My Website
        </Link>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">About Me</Link>
        </li>
        <li>
          <Link to="/">Skills</Link>
        </li>
        <li>
          <Link to="/">Web3</Link>
        </li>
      </ul>
    </nav>
  );
}
