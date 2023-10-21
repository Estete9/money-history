import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from './SectionHeader';
import { fetchCurrencyHistory, clearCurrencyHistory } from '../redux/currencies/currenciesSlice';
import CurrencyHistoryElement from './CurrencyHistoryElement';
import styles from '../styles/currencyHistory.module.css';

function CurrencyHistory() {
  const { symbol } = useParams();
  const [previousSymbol, setPreviousSymbol] = useState();
  // prettier-ignore
  const {
    currencyHistory,
    currenciesData,
    isLoadingHistory,
    error,
  } = useSelector(
    (store) => store.currencies,
  );
  const [currentDate] = useState(new Date());
  const dispatch = useDispatch();
  const getCountryName = (currenciesData, symbol) => {
    const currency = currenciesData.find((currency) => currency.currencySymbol === symbol);
    return currency ? currency.currencyCountry : 'Country not found';
  };
  useEffect(
    () => () => {
      if (!isLoadingHistory && currencyHistory.length && symbol === previousSymbol) {
        dispatch(clearCurrencyHistory());
      }
    },
    [currencyHistory.length, dispatch, isLoadingHistory, previousSymbol, symbol],
  );

  useEffect(() => {
    if (isLoadingHistory && !currencyHistory.length && symbol !== previousSymbol) {
      dispatch(fetchCurrencyHistory({ symbol, currentDate }));
      setPreviousSymbol(symbol);
    }
  }, [currencyHistory.length, currentDate, dispatch, isLoadingHistory, previousSymbol, symbol]);

  const sectionHeaderValue = currencyHistory.find(
    (history) => Object.keys(history.rates)[0] === symbol,
  );

  if (isLoadingHistory) {
    return <div>Currency&apos;s History loading...</div>;
  }

  if (error) {
    return <div>{`We encountered an error: ${JSON.stringify(error)}`}</div>;
  }

  if (!currencyHistory.length) {
    return (
      <section>
        <header>
          <h2>There are no rockets for the moment</h2>
          <h4>Our rocket list is empty</h4>
        </header>
      </section>
    );
  }

  return (
    <div>
      <SectionHeader
        countryName={getCountryName(currenciesData, symbol)}
        value={sectionHeaderValue ? sectionHeaderValue.rates[symbol] : ''}
        symbol={symbol}
      />
      <div className={styles.separator}>PAST 5 YEARS</div>
      {currencyHistory.map((yearObj) => (
        <div key={uuidv4()} className={styles.historyElementWrapper}>
          <CurrencyHistoryElement
            currency={{
              currencySymbol: symbol,
              year: yearObj.date.split('-')[0],
              value: currencyHistory ? JSON.stringify(yearObj.rates[`${symbol}`]) : -2,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default CurrencyHistory;
