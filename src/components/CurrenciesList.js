import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import CurrencyElement from './CurrencyElement';
import styles from '../styles/currenciesList.module.css';

function CurrenciesList() {
  const currencies = ['USD', 'GBP', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];

  return (
    <div>
      <SectionHeader name="EUR Euro" value="1.594" />
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
