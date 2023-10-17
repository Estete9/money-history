import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import CurrencyElement from './CurrencyElement';
import styles from '../styles/currenciesList.module.css';
import { fetchSymbolsAPI } from '../redux/currencies/currenciesSlice';

function CurrenciesList() {
  const currencies = ['USD', 'GBP', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];

  const dispatch = useDispatch();
  const { currenciesData, isLoading, error } = useSelector((store) => store.currencies);
  useEffect(() => {
    if (isLoading && !currenciesData.length) {
      dispatch(fetchSymbolsAPI());
    }
  }, [currenciesData.length, dispatch, isLoading]);

  if (isLoading) {
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
      <SectionHeader name="Euro" value="$1.594" />
      <div className={styles.currenciesGrid}>
        {currencies.map((currency) => (
          <Link key={currency} to={`/currency/${currency}`}>
            <CurrencyElement currency={currency} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CurrenciesList;
