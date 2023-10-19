import { useSelector, useDispatch } from 'react-redux';
import { toggleSearchBar, updateSearchQuery } from '../redux/header/headerSlice';
import closeBtn from '../assets/close.svg';
import styles from '../styles/searchBar.module.css';

function SearchBar() {
  const { isSearchBarOpen, searchQuery } = useSelector((store) => store.header);
  const dispatch = useDispatch();

  const handleCloseBtn = () => {
    dispatch(toggleSearchBar());
  };

  const handleSearchQuery = (event) => {
    dispatch(updateSearchQuery(event.target.value));
  };

  // useEffect((queryValue) => {
  //   dispatch(updateSearchQuery(queryValue));
  // });

  return (
    isSearchBarOpen && (
      <div className={`${styles.searchBarWrapper} ${isSearchBarOpen ? styles.show : ''}`}>
        <input
          className={styles.searchBar}
          placeholder="Select one of the 8 available currencies"
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e)}
        />
        <button type="button" className={styles.closeBtn} onClick={handleCloseBtn}>
          <img className={styles.closeBtnImg} src={closeBtn} alt="closeBtn icon" />
        </button>
      </div>
    )
  );
}

export default SearchBar;
