import PropTypes from 'prop-types';
import styles from '../styles/currencyElement.module.css';

function CurrencyElement({ currency }) {
  return (
    <div className={styles.td}>
      <img src="/" alt="currencyImg" />
      <div className={styles.currencyContent}>
        <p>{currency.currencyCountry}</p>
        <p>{currency.currencySymbol}</p>
      </div>
    </div>
  );
}

CurrencyElement.propTypes = {
  currency: PropTypes.shape({
    currencyCountry: PropTypes.string.isRequired,
    currencySymbol: PropTypes.string.isRequired,
  }),
};

CurrencyElement.defaultProps = {
  currency: {
    currencyCountry: '',
    currencySymbol: '',
  },
};

export default CurrencyElement;
