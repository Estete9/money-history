import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from './SectionHeader';
import { fetchCurrencyConversion } from '../redux/currencies/currenciesSlice';
import CurrencyConversionElement from './CurrencyConversionElement';
import styles from '../styles/currencyConversion.module.css';

const topCurrencyArray = ['usd', 'gbp', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'];
const symbols = {
  eur: '€',
  usd: '$',
  zar: 'R',
  aud: 'A$',
  cad: 'C$',
  jpy: '¥',
  gbp: '£',
  chf: 'CHF',
};

function CurrencyConversion() {
  const { symbol } = useParams();
  // prettier-ignore
  const {
    currencyConversion, currenciesData, isLoadingConversion, error,
  } = useSelector((store) => store.currencies);
  const dispatch = useDispatch();
  const getCountryName = (currenciesData, symbol) => {
    const currency = currenciesData.find((currency) => currency.currencySymbol === symbol);
    return currency ? currency.currencyCountry : 'Country not found';
  };

  const countryName = getCountryName(currenciesData, symbol);

  useEffect(() => {
    if (isLoadingConversion && !currencyConversion.length) {
      dispatch(fetchCurrencyConversion({ symbol }));
    }
  }, [currencyConversion, dispatch, isLoadingConversion, symbol]);

  if (isLoadingConversion) {
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
  // prettier-ignore
  const conversionToEuro = () => (
    currencyConversion.find((conversionObj) => conversionObj.currencySymbol === 'eur').currencyConversionValue
  );

  return (
    <div>
      <SectionHeader countryName={countryName} value={conversionToEuro()} symbol={symbol} />
      <div className={styles.separator}>CONVERSION RATES</div>
      {currencyConversion.map((conversionObj) => {
        const currentSymbol = conversionObj.currencySymbol;
        return (
          topCurrencyArray.includes(currentSymbol) && (
            <div key={uuidv4()} className={styles.conversionElementWrapper}>
              <CurrencyConversionElement
                currency={{
                  currencySymbol: currentSymbol,
                  value: conversionObj.currencyConversionValue,
                  currencyCode: symbols[currentSymbol],
                }}
              />
            </div>
          )
        );
      })}
    </div>
  );
}

export default CurrencyConversion;
