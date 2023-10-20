import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import CurrencyElement from './CurrencyElement';
import styles from '../styles/currenciesList.module.css';
import { fetchSymbolsAPI } from '../redux/currencies/currenciesSlice';
import { toggleSearchBar } from '../redux/header/headerSlice';

function CurrenciesList() {
  const dispatch = useDispatch();
  const { currenciesData, isLoadingData, error } = useSelector((store) => store.currencies);
  const { searchQuery, isSearchBarOpen } = useSelector((store) => store.header);
  const [filteredCurrencies, setFilteredCurrencies] = useState(currenciesData);

  const handleCloseSearchBar = () => {
    if (isSearchBarOpen) {
      dispatch(toggleSearchBar());
    }
  };

  useEffect(() => {
    if (isLoadingData && !currenciesData.length) {
      dispatch(fetchSymbolsAPI());
    }
  }, [currenciesData, dispatch, isLoadingData]);

  useEffect(() => {
    if (currenciesData.length) {
      setFilteredCurrencies(currenciesData);
    }
  }, [currenciesData]);

  // prettier-ignore
  useEffect(() => {
    if (searchQuery && currenciesData.length) {
      const filteredData = currenciesData.filter((currency) => currency.currencySymbol
        .toLowerCase()
        .includes(searchQuery.toLowerCase()));
      setFilteredCurrencies(filteredData);
    }
    if (!searchQuery) {
      setFilteredCurrencies(currenciesData);
    }
  }, [currenciesData, dispatch, searchQuery]);

  if (isLoadingData) {
    return <div>Currencies loading...</div>;
  }

  if (error) {
    return <div>{`We encountered an error: ${JSON.stringify(error)}`}</div>;
  }

  if (!currenciesData.length) {
    return (
      <section>
        <header>
          <h2>There are no currencies for the moment</h2>
          <h4>Our currency list is empty</h4>
        </header>
      </section>
    );
  }

  return (
    <div>
      <SectionHeader countryName="Euro" value={1} symbol="EUR" />
      <div className={styles.separator}>CURRENCIES</div>
      <div className={styles.currenciesGrid}>
        {filteredCurrencies.map((currency, index) => (
          <Link
            className={`${styles.currencyItem} ${
              index % 4 === 0 || index % 4 === 3 ? styles.color1 : styles.color2
            }`}
            key={uuidv4()}
            to={`/currency/${currency.currencySymbol}`}
            onClick={handleCloseSearchBar}
          >
            <CurrencyElement currency={currency} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CurrenciesList;
