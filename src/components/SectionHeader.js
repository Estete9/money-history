import PropTypes from 'prop-types';
import styles from '../styles/sectionHeader.module.css';
import euroSVG from '../assets/currencies/eur.svg';

function SectionHeader({ countryName, value, symbol }) {
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

  const getSymbol = () => {
    const currency = Object.keys(symbols).find((key) => key === symbol);
    return symbols[currency];
  };

  const isEuro = symbol === 'eur';

  return (
    <section className={styles.sectionHeader}>
      <div className={styles.sectionHeaderImgWrapper}>
        <img className={styles.sectionHeaderImg} src={euroSVG} alt="currency icon" />
      </div>
      <div className={styles.sectionHeaderContentWrapper}>
        <h1>{`${getSymbol()} ${value.toFixed(4)}`}</h1>
        <p>{countryName}</p>
        <p>{isEuro ? '$1.06 dollars' : '€1 euro'}</p>
      </div>
    </section>
  );
}

SectionHeader.propTypes = {
  countryName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
};

SectionHeader.defaultProp = {
  symbol: 'eur',
  value: -2,
  countryName: 'Euro',
};
export default SectionHeader;
