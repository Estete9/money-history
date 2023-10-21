import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyHistoryElement from '../components/CurrencyHistoryElement';

test('should render CurrencyHistoryElement', () => {
  const currency = {
    year: '2023',
    currencySymbol: 'GBP',
    value: '1.65',
  };
  const component = renderer.create(<CurrencyHistoryElement currency={currency} />);
  const historyElementTree = component.toJSON();
  expect(historyElementTree).toMatchSnapshot();
});
