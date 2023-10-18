import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from './SectionHeader';
import { fetchCurrencyHistory } from '../redux/currencies/currenciesSlice';
import CurrencyHistoryElement from './CurrencyHistoryElement';

function CurrencyHistory() {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const [past5Years, setPast5Years] = useState([]);
  const { currenciesData, currencyHistory } = useSelector((store) => store.currencies);

  // console.log('currenciesData', currenciesData);
  console.log('currencyHistory', currencyHistory);
  // console.log('currencyHistory.rates[symbol]', currencyHistory.rates[`${symbol}`]);

  useEffect(() => {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const pastYears = [];

    for (let i = 0; i < 5; i += 1) {
      pastYears.push(currentYear - 1);
      currentYear -= 1;
    }

    setPast5Years(pastYears); // Set past5Years first

    // Now make API calls based on past5Years
    pastYears.forEach((year) => {
      dispatch(fetchCurrencyHistory({ symbol, currentDate, year }));
    });
  }, [dispatch, symbol]);

  const getCountryName = (currenciesData, symbol) => {
    const currency = currenciesData.find((currency) => currency.currencySymbol === symbol);
    return currency ? currency.currencyCountry : 'Country not found';
  };

  const getValueVSEuro = (currencyHistory, symbol) => {
    const value = JSON.stringify(currencyHistory.rates[symbol]);
    console.log('currencyHistory.rates[symbol]', value);
  };

  // getValueVSEuro(currencyHistory, 'AUD');
  return (
    <div>
      <SectionHeader name={symbol} value="1.594" />
      {past5Years.map((year) => (
        <CurrencyHistoryElement
          key={uuidv4()}
          currency={{
            currencyCountry: getCountryName(currenciesData, symbol),
            currencySymbol: symbol,
            year,
            // value: currencyHistory.rates[`${symbol}`],
            value: 0,
          }}
        />
      ))}
    </div>
  );
}

export default CurrencyHistory;
