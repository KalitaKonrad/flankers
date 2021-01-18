import { render } from '@testing-library/react-native';
import * as React from 'react';

import { PlayerAvatarList } from '../../../src/components/match/PlayerAvatarList';

describe('<PlayerAvatarList>', () => {
  it('renders correctly', () => {
    const tree = render(<PlayerAvatarList players={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
