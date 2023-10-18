import PropTypes from 'prop-types';

function CurrencyHistoryElement({ currency }) {
  return (
    <>
      <div>{currency.year}</div>
      <div>{`${currency.currencySymbol} ${currency.value} = EUR 1`}</div>
    </>
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
