import { render } from '@testing-library/react-native';
import React from 'react';

import { TeamMemberList } from '../../../src/components/team/TeamMembersList';

describe('<TeamMembersList>', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<TeamMemberList members={[]} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
