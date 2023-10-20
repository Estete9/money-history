import PropTypes from 'prop-types';
import styles from '../styles/currencyHistoryElement.module.css';
import arrowRightImg from '../assets/arrow-right.svg';

function CurrencyHistoryElement({ currency }) {
  return (
    <div className={styles.currencyHistoryElementWrapper}>
      <div>{currency.year}</div>
      <p className={styles.currencyConversion}>{`${currency.currencySymbol} ${currency.value} = EUR 1`}</p>
      <img className={styles.historyArrowImg} src={arrowRightImg} alt="enter currency history button" />
    </div>
  );
}

CurrencyHistoryElement.propTypes = {
  currency: PropTypes.shape({
    currencySymbol: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
};

CurrencyHistoryElement.defaultProps = {
  currency: {
    currencySymbol: '',
    year: 0,
    value: 0,
  },
};
export default CurrencyHistoryElement;
