import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Switch } from '../../../src/components/shared/Switch';

describe('<Switch>', () => {
  it('renders correctly', () => {
    const tree = render(
      <Switch
        leftLabel="Left"
        rightLabel="Right"
        onSwitchToLeft={() => null}
        onSwitchToRight={() => null}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
