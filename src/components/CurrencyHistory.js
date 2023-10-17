import { useParams } from 'react-router-dom';
import SectionHeader from './SectionHeader';

function CurrencyHistory() {
  const { symbol } = useParams();

  return (
    <div>
      <SectionHeader name={symbol} value="1.594" />
      <h1>{`this is the symbol passed ${symbol}`}</h1>
    </div>
  );
}

export default CurrencyHistory;
