import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyConversionElement from '../components/CurrencyConversionElement';

test('should render CurrencyConversionElement', () => {
  const currency = {
    year: '2023',
    currencySymbol: 'GBP',
    value: '1.65',
  };
  const component = renderer.create(<CurrencyConversionElement currency={currency} />);
  const conversionElementTree = component.toJSON();
  expect(conversionElementTree).toMatchSnapshot();
});
