import PropTypes from 'prop-types';
import SectionHeader from './SectionHeader';

function CurrencyHistoryElement({ currency }) {
  return (
    <>
      <SectionHeader name={currency.currencyCountry} value={currency.currencySymbol} />
      <div>{currency.currencyCountry}</div>
      <div>{currency.value}</div>
    </>
  );
}

CurrencyHistoryElement.propTypes = {
  currency: PropTypes.shape({
    currencyCountry: PropTypes.string.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }),
};

CurrencyHistoryElement.defaultProps = {
  currency: {
    currencyCountry: '',
    currencySymbol: '',
    year: 0,
    value: 0,
  },
};
export default CurrencyHistoryElement;
