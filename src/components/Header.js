import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import styles from '../styles/header.module.css';
import searchIcon from '../assets/searchIcon.svg';
import backChevron from '../assets/back-chevron.svg';

function Header() {
  const location = useLocation();
  const atHome = location.pathname === '/';

  return (
    <header className={styles.header}>
      {!atHome && (
        <NavLink className={styles.backSection} to="/">
          <img className={styles.backBtn} src={backChevron} alt="back button" />
          <h3>{new Date().getFullYear()}</h3>
        </NavLink>
      )}
      <h3 className={styles.headerTitle}>Top 8 Currencies</h3>
      {atHome && <img className={styles.searchIcon} src={searchIcon} alt="search icon" />}
    </header>
  );
}

export default Header;
