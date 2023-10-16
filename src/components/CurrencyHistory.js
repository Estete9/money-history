import { useParams } from 'react-router-dom';

function CurrencyHistory() {
  const { symbol } = useParams();

  return (
    <div>
      <h1>{`this is the symbol passed ${symbol}`}</h1>
    </div>
  );
}

export default CurrencyHistory;
