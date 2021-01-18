import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Avatar } from '../../../src/components/shared/Avatar';

describe('<Avatar>', () => {
  it('renders correctly', () => {
    const tree = render(
      <Avatar src={{ uri: 'https://test.example/image.jpg' }} size={100} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
