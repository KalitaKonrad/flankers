import { render } from '@testing-library/react-native';
import * as React from 'react';

import { AvatarSelectButton } from '../../../src/components/shared/AvatarSelectButton';

describe('<AvatarSelectButton>', () => {
  it('renders correctly', () => {
    const tree = render(
      <AvatarSelectButton
        avatarUri="https://test.example/image.jpg"
        onAvatarChange={() => null}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
