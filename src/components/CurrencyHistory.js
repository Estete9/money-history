import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SectionHeader from './SectionHeader';
import { fetchCurrencyHistory } from '../redux/currencies/currenciesSlice';

function CurrencyHistory() {
  const { symbol } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const currentDate = new Date();
    const getPast5Years = () => {
      const years = [];
      let currentYear = currentDate.getFullYear();
      for (let i = 0; i < 5; i += 1) {
        years.push(currentYear - 1);
        currentYear -= 1;
      }
      return years;
    };
    const past5Years = getPast5Years();
    past5Years.map((year) => dispatch(fetchCurrencyHistory({ symbol, currentDate, year })));
  }, [dispatch, symbol]);

  return (
    <div>
      <SectionHeader name={symbol} value="1.594" />
      <h1>{`this is the symbol passed ${symbol}`}</h1>
    </div>
  );
}

export default CurrencyHistory;
