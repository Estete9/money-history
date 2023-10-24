import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyConversionElement from '../components/CurrencyConversionElement';

/**
 * currencySymbol: 'No Symbol',
    value: 0,
    currencyCode: 'No CurrencyCode',
 */

test('should render CurrencyConversionElement', () => {
  const currency = {
    currencyCode: '£',
    currencySymbol: 'gbp',
    value: 1.65,
  };
  const component = renderer.create(<CurrencyConversionElement currency={currency} />);
  const conversionElementTree = component.toJSON();
  expect(conversionElementTree).toMatchSnapshot();
});
