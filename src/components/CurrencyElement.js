import PropTypes from 'prop-types';
import styles from '../styles/currencyElement.module.css';

function CurrencyElement({ currency }) {
  return (
    <div className={styles.td}>
      <img src="/" alt="currencyImg.name" />
      <div className={styles.currencyContent}>
        <p>{`currency name (needs to change later) ${currency}`}</p>
        <p>{`currency symbol ${currency}`}</p>
      </div>
    </div>
  );
}

CurrencyElement.propTypes = {
  currency: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }),
};

CurrencyElement.defaultProps = {
  currency: {
    icon: '',
    name: '',
    symbol: '',
  },
};

export default CurrencyElement;
