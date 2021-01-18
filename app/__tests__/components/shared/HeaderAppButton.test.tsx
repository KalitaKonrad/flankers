import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { HeaderAppButton } from '../../../src/components/shared/HeaderAppButton';
import { theme } from '../../../src/theme';

describe('<HeaderAppButton>', () => {
  it('renders correctly', () => {
    const tree = render(
      <PaperProvider theme={theme}>
        <HeaderAppButton>Test</HeaderAppButton>
      </PaperProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
