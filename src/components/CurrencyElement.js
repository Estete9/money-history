import PropTypes from 'prop-types';
import styles from '../styles/currencyElement.module.css';

// dynamically import all images
const svgContext = require.context('../assets/currencies', false, /\.svg$/);
const currencyImages = {};
svgContext.keys().forEach((key) => {
  const symbol = key.replace('./', '').replace('.svg', '');
  currencyImages[symbol] = svgContext(key);
});

function CurrencyElement({ currency }) {
  const imageSource = currencyImages[currency.currencySymbol];
  return (
    <div className={styles.td}>
      <img className={styles.currencyElementImg} src={imageSource} alt="currencyImg" />
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
