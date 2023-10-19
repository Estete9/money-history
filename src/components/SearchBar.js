import { useSelector, useDispatch } from 'react-redux';
import { openSearchBar } from '../redux/header/headerSlice';
import closeBtn from '../assets/close.svg';
import styles from '../styles/searchBar.module.css';

function SearchBar() {
  const { isOpen } = useSelector((store) => store.header);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openSearchBar());
  };

  return (
    isOpen && (
      <div className={`${styles.searchBarWrapper} ${isOpen ? styles.show : ''}`}>
        <input
          className={styles.searchBar}
          placeholder="Select one of the 8 available currencies"
          type="text"
        />
        <button type="button" className={styles.closeBtn} onClick={handleClick}>
          <img className={styles.closeBtnImg} src={closeBtn} alt="closeBtn icon" />
        </button>
      </div>
    )
  );
}

export default SearchBar;
