import { render } from '@testing-library/react-native';
import * as React from 'react';

import { TeamInvitesList } from '../../../src/components/team/TeamInvitesList';

describe('<TeamInvitesList>', () => {
  it('renders correctly when empty array with data provided', () => {
    const tree = render(
      <TeamInvitesList
        invites={[]}
        modalRef={null as any}
        setAcceptToken={() => null}
        setDeclineToken={() => null}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when all data provided', () => {
    const mockData = [
      {
        id: 5,
        user_id: 5,
        team_id: 5,
        type: 'string',
        email: 'string',
        accept_token: 'string',
        deny_token: 'string',
        created_at: 'string',
        updated_at: 'string',
        team_name: 'string',
        team_avatar: 'string',
        team_description: 'string',
      },
    ];

    const tree = render(
      <TeamInvitesList
        invites={mockData}
        modalRef={null as any}
        setAcceptToken={() => null}
        setDeclineToken={() => null}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
