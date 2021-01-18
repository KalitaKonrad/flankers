import { render } from '@testing-library/react-native';
import * as React from 'react';

import { TeamMemberList } from '../../../src/components/team/TeamMembersList';

describe('<TeamMembersList>', () => {
  it('renders correctly', () => {
    const tree = render(<TeamMemberList members={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
