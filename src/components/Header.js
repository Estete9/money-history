import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/header.module.css';
import searchIcon from '../assets/searchIcon.svg';
import backChevron from '../assets/back-chevron.svg';
import SearchBar from './SearchBar';
import { toggleSearchBar } from '../redux/header/headerSlice';
import { clearCurrencyHistory } from '../redux/currencies/currenciesSlice';

function Header() {
  const location = useLocation();
  const atHome = location.pathname === '/';
  const { isSearchBarOpen } = useSelector((store) => store.header);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSearchBar());
  };

  const handleBackClick = () => {
    dispatch(clearCurrencyHistory());
  };

  return (
    <header className={styles.header}>
      {!atHome && (
        <NavLink className={styles.backSection} to="/" onClick={handleBackClick}>
          <img className={styles.backBtn} src={backChevron} alt="back button" />
          <h3>{new Date().getFullYear()}</h3>
        </NavLink>
      )}
      <h3 className={styles.headerTitle}>Top 8 Currencies</h3>
      {atHome && (
        <button type="button" className={styles.searchBtn} onClick={handleClick}>
          <img className={styles.searchIconImg} src={searchIcon} alt="search icon" />
        </button>
      )}
      {isSearchBarOpen && <SearchBar className={styles.searchBar} />}
    </header>
  );
}

export default Header;

/**
 * import { clearCurrencyHistory } from '../redux/currencies/currenciesSlice';
  const onClickBackHandle = () => {
    dispatch(clearCurrencyHistory());
  };
 */
