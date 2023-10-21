import PropTypes from 'prop-types';
import styles from '../styles/currencyElement.module.css';
import arrowRightImg from '../assets/arrow-right.svg';

import cadSVG from '../assets/currencies/CAD.svg';
import usdSVG from '../assets/currencies/USD.svg';
import eurSVG from '../assets/currencies/EUR.svg';
import jpySVG from '../assets/currencies/JPY.svg';
import chfSVG from '../assets/currencies/CHF.svg';
import audSVG from '../assets/currencies/AUD.svg';
import zarSVG from '../assets/currencies/ZAR.svg';
import gbpSVG from '../assets/currencies/GBP.svg';

const currencyImages = {
  CAD: cadSVG,
  USD: usdSVG,
  EUR: eurSVG,
  JPY: jpySVG,
  CHF: chfSVG,
  AUD: audSVG,
  ZAR: zarSVG,
  GBP: gbpSVG,
};

function CurrencyElement({ currency }) {
  const imageSource = currencyImages[currency.currencySymbol];
  return (
    <div className={styles.td}>
      <div className={styles.enterArrowWrapper}>
        <img
          className={styles.enterCurrencyArrow}
          src={arrowRightImg}
          alt="enter currency button"
        />
      </div>
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
