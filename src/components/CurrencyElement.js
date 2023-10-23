import PropTypes from 'prop-types';
import styles from '../styles/currencyElement.module.css';
import arrowRightImg from '../assets/arrow-right.svg';

import cadSVG from '../assets/currencies/cad.svg';
import usdSVG from '../assets/currencies/usd.svg';
import eurSVG from '../assets/currencies/eur.svg';
import jpySVG from '../assets/currencies/jpy.svg';
import chfSVG from '../assets/currencies/chf.svg';
import audSVG from '../assets/currencies/aud.svg';
import zarSVG from '../assets/currencies/zar.svg';
import gbpSVG from '../assets/currencies/gbp.svg';

const currencyImages = {
  cad: cadSVG,
  usd: usdSVG,
  eur: eurSVG,
  jpy: jpySVG,
  chf: chfSVG,
  aud: audSVG,
  zar: zarSVG,
  gbp: gbpSVG,
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
