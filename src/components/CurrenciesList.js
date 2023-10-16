import { Link } from 'react-router-dom';

function CurrenciesList() {
  const currency = ['USD', 'GBP', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];

  return (
    <div>
      <h1>this is currencies list</h1>
      <ul>
        <li key={currency[0]}>
          <Link to={`/currency/${currency[0]}`}>currency one</Link>
        </li>
        <li key={currency[1]}>
          <Link to={`/currency/${currency[1]}`}>currency two</Link>
        </li>
      </ul>
    </div>
  );
}

export default CurrenciesList;
