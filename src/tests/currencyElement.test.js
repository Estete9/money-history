import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyElement from '../components/CurrencyElement';

test('Checks that CurrencyElement component renders correctly', () => {
  const currency = {
    currencyCountry: 'Australian Dollar',
    currencySymbol: 'AUD',
  };
  const component = renderer.create(<CurrencyElement currency={currency} />);
  const currencyElementTree = component.toJSON();
  expect(currencyElementTree).toMatchSnapshot();
});
