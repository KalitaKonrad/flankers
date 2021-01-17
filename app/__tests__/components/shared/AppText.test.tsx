import { render } from '@testing-library/react-native';
import React from 'react';

import { AppText } from '../../../src/components/shared/AppText';

describe('<AppText>', () => {
  it('should render correctly', () => {
    const tree = render(<AppText>Test</AppText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pass children to inner Text component', () => {
    const { getByTestId } = render(<AppText>Test text</AppText>);
    expect(getByTestId('app-text').props.children).toBe('Test text');
  });

  it('should set correct styles based on variant', () => {
    expect(render(<AppText variant="h1">H1</AppText>)).toMatchSnapshot();
    expect(render(<AppText variant="h2">H1</AppText>)).toMatchSnapshot();
    expect(render(<AppText variant="h3">H1</AppText>)).toMatchSnapshot();
  });
});
