import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from './SectionHeader';
import { fetchCurrencyHistory } from '../redux/currencies/currenciesSlice';
import CurrencyHistoryElement from './CurrencyHistoryElement';

function CurrencyHistory() {
  const { symbol } = useParams();
  const {
    currencyHistory, currenciesData, isLoadingHistory, error,
  } = useSelector(
    (store) => store.currencies,
  );
  const [currentDate] = useState(new Date());

  const dispatch = useDispatch();

  const getCountryName = (currenciesData, symbol) => {
    const currency = currenciesData.find((currency) => currency.currencySymbol === symbol);
    return currency ? currency.currencyCountry : 'Country not found';
  };

  useEffect(() => {
    if (isLoadingHistory && !currencyHistory.length) {
      dispatch(fetchCurrencyHistory({ symbol, currentDate }));
    }
  }, [currencyHistory, currenciesData, dispatch, isLoadingHistory, symbol, currentDate]);

  if (isLoadingHistory) {
    return <div>Currency&apos;s History loading...</div>;
  }

  if (error) {
    return <div>{`We encountered an error: ${JSON.stringify(error)}`}</div>;
  }

  if (!currencyHistory) {
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
        symbol={symbol}
        value="1.594"
      />
      {currencyHistory.map((yearObj, index) => (
        <CurrencyHistoryElement
          key={uuidv4()}
          currency={{
            currencySymbol: symbol,
            year: yearObj.date.split('-')[0],
            value: currencyHistory ? JSON.stringify(currencyHistory[index].rates[`${symbol}`]) : -2,
          }}
        />
      ))}
    </div>
  );
}

export default CurrencyHistory;
