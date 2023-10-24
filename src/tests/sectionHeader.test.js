import renderer from 'react-test-renderer';
import React from 'react';
import SectionHeader from '../components/SectionHeader';

test('section header renders correctly', () => {
  const mockValues = {
    countryName: 'United States Dollar',
    value: 1,
    symbol: 'usd',
  };
  const component = renderer.create(
    <SectionHeader
      symbol={mockValues.symbol}
      value={mockValues.value}
      countryName={mockValues.countryName}
    />,
  );
  const sectionHeaderTree = component.toJSON();

  expect(sectionHeaderTree).toMatchSnapshot();
});
