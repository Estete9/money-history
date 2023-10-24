import PropTypes from 'prop-types';
import styles from '../styles/currencyConversionElement.module.css';
import arrowRightImg from '../assets/arrow-right.svg';

function CurrencyConversionElement({ currency }) {
  return (
    <div className={styles.currencyConversionElementWrapper}>
      <div>{currency.currencySymbol.toUpperCase()}</div>
      <p className={styles.currencyConversion}>
        {`${currency.currencyCode} ${
          currency.value !== parseInt(currency.value, 10)
            ? currency.value.toFixed(4)
            : currency.value
        }`}
      </p>
      <img
        className={styles.conversionArrowImg}
        src={arrowRightImg}
        alt="enter currency conversion button"
      />
    </div>
  );
}

CurrencyConversionElement.propTypes = {
  currency: PropTypes.shape({
    currencySymbol: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    currencyCode: PropTypes.string.isRequired,
  }),
};

CurrencyConversionElement.defaultProps = {
  currency: {
    currencySymbol: 'No Symbol',
    value: 0,
    currencyCode: 'No CurrencyCode',
  },
};
export default CurrencyConversionElement;
