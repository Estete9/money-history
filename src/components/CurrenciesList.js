import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import CurrencyElement from './CurrencyElement';
import styles from '../styles/currenciesList.module.css';
import { fetchSymbolsAPI } from '../redux/currencies/currenciesSlice';

function CurrenciesList() {
  const dispatch = useDispatch();
  const { currenciesData, isLoadingData, error } = useSelector((store) => store.currencies);
  useEffect(() => {
    if (isLoadingData && !currenciesData.length) {
      dispatch(fetchSymbolsAPI());
    }
  }, [currenciesData.length, dispatch, isLoadingData]);

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
      {/* update this HEADER INFORMATION */}
      <SectionHeader countryName="Euro" value="$1.594" />
      <div className={styles.currenciesGrid}>
        {currenciesData.map((currency) => (
          <Link key={uuidv4()} to={`/currency/${currency.currencySymbol}`}>
            <CurrencyElement currency={currency} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CurrenciesList;
