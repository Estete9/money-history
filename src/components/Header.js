import { NavLink } from 'react-router-dom';
import React from 'react';

function Header() {
  return (
    <header>
      <NavLink to="/">
        <img src="/" alt="back button" />
        <h3>2005</h3>
      </NavLink>
      <h1>Currency</h1>
    </header>
  );
}

export default Header;
