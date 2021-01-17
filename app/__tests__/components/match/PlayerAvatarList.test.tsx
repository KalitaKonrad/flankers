import { render } from '@testing-library/react-native';
import React from 'react';

import { PlayerAvatarList } from '../../../src/components/match/PlayerAvatarList';

describe('<PlayerAvatarList>', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<PlayerAvatarList players={[]} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
