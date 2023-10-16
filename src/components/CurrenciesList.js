import { Link } from 'react-router-dom';

function CurrenciesList() {
  const currencies = ['USD', 'GBP', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];

  return (
    <div>
      <h1>this is currencies list</h1>
      <ul>
        {currencies.map((currency) => (
          <li key={currency}>
            <Link to={`/currency/${currency}`}>{`currency ${currency}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrenciesList;
