import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

import { Container } from '../../components/layout/Container';
import { AppButton } from '../../components/shared/AppButton';
import { Modal } from '../../components/shared/modal/Modal';
import { TeamInvitesList } from '../../components/team/TeamInvitesList';
import { useAlert } from '../../hooks/useAlert';
import { useInvitationAcceptMutation } from '../../hooks/useInvitationAcceptMutation';
import { useInvitationDeclineMutation } from '../../hooks/useInvitationDeclineMutation';
import { useTeamInvitationsQuery } from '../../hooks/useTeamInvitationsQuery';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamInvitationsScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamInvitations'
>;

// TODO: delete after testing phase
const invitesList = [
  {
    id: 3,
    user_id: 21,
    team_id: 38,
    type: 'invite',
    email: 'jasen.langworth@example.com',
    accept_token: '7750ae5359e316318f26b0653ebbe85f',
    deny_token: 'f9e9e47a543b5b9092314b6c1e17b00f',
    created_at: '2021-01-17 02:00:19',
    updated_at: '2021-01-17 02:00:19',
    team_name: 'Marlin Purdy',
    team_description:
      'Possimus magni repellendus aut rem explicabo cupiditate in. Sunt sit occaecati ipsum provident ut rerum vel et. Nisi eius sit qui sunt voluptatum quos nihil.',
    team_avatar: 'https://eu.ui-avatars.com/api/?format=png&name=flankers',
  },
  {
    id: 3,
    user_id: 21,
    team_id: 38,
    type: 'invite',
    email: 'jasen.langworth@example.com',
    accept_token: '7750ae5359e316318f26b0653ebbe85f',
    deny_token: 'f9e9e47a543b5b9092314b6c1e17b00f',
    created_at: '2021-01-17 02:00:19',
    updated_at: '2021-01-17 02:00:19',
    team_name: 'Marlin Purdy',
    team_description:
      'Possimus magni repellendus aut rem explicabo cupiditate in. Sunt sit occaecati ipsum provident ut rerum vel et. Nisi eius sit qui sunt voluptatum quos nihil.',
    team_avatar: 'https://eu.ui-avatars.com/api/?format=png&name=flankers',
  },
  {
    id: 3,
    user_id: 21,
    team_id: 38,
    type: 'invite',
    email: 'jasen.langworth@example.com',
    accept_token: '7750ae5359e316318f26b0653ebbe85f',
    deny_token: 'f9e9e47a543b5b9092314b6c1e17b00f',
    created_at: '2021-01-17 02:00:19',
    updated_at: '2021-01-17 02:00:19',
    team_name: 'Marlin Purdy',
    team_description:
      'Possimus magni repellendus aut rem explicabo cupiditate in. Sunt sit occaecati ipsum provident ut rerum vel et. Nisi eius sit qui sunt voluptatum quos nihil.',
    team_avatar: 'https://eu.ui-avatars.com/api/?format=png&name=flankers',
  },
  {
    id: 3,
    user_id: 21,
    team_id: 38,
    type: 'invite',
    email: 'jasen.langworth@example.com',
    accept_token: '7750ae5359e316318f26b0653ebbe85f',
    deny_token: 'f9e9e47a543b5b9092314b6c1e17b00f',
    created_at: '2021-01-17 02:00:19',
    updated_at: '2021-01-17 02:00:19',
    team_name: 'Marlin Purdy',
    team_description:
      'Possimus magni repellendus aut rem explicabo cupiditate in. Sunt sit occaecati ipsum provident ut rerum vel et. Nisi eius sit qui sunt voluptatum quos nihil.',
    team_avatar: 'https://eu.ui-avatars.com/api/?format=png&name=flankers',
  },
];
export const TeamInvitationsScreen: React.FC<TeamInvitationsScreenProps> = ({
  route,
  navigation,
}) => {
  const invites = useTeamInvitationsQuery();
  // TODO: enable when real data is available
  // const invitesList = invites?.data?.data ?? [];

  const profile = useUserProfileQuery();
  const userTeam = profile?.data?.teams?.[0];

  const modalJoinTeam = useRef<BottomSheet | null>(null);
  const declineInvitation = useInvitationDeclineMutation();
  const acceptInvitation = useInvitationAcceptMutation();
  const { showAlert } = useAlert();

  const [acceptToken, setAcceptToken] = useState('');
  const [declineToken, setDeclineToken] = useState('');
  const isLoading = acceptInvitation.isLoading || declineInvitation.isLoading;

  const onAcceptInvite = useCallback(async () => {
    if (userTeam) {
      showAlert(
        'Uwaga!',
        'Jesteś obecnie w drużynie! W celu dołączenia do innej drużyny musisz opuścić swoją obecną!',
        () => modalJoinTeam?.current?.snapTo(1)
      );

      return;
    }

    try {
      await acceptInvitation.mutateAsync(acceptToken);
    } catch (e) {
      showAlert(
        'Ups!',
        'Wystąpił problem podczas próby zaakceptowania zaproszenia do drużyny',
        () => modalJoinTeam?.current?.snapTo(1)
      );
    } finally {
      modalJoinTeam?.current?.snapTo(1);
    }
  }, [acceptInvitation, acceptToken, showAlert, userTeam]);

  const onDeclineInvite = useCallback(async () => {
    try {
      await declineInvitation.mutateAsync(declineToken);
    } catch (e) {
      showAlert(
        'Ups!',
        'Wystąpił problem podczas próby odrzucenia zaproszenia do drużyny'
      );
    } finally {
      modalJoinTeam?.current?.snapTo(1);
    }
  }, [declineInvitation, declineToken, showAlert]);

  return (
    <Container>
      {invites.isFetching ? (
        <ListPlaceholder placeholderCount={6} itemHeight={80} />
      ) : (
        <TeamInvitesList
          invites={invitesList}
          modalRef={modalJoinTeam}
          setAcceptToken={setAcceptToken}
          setDeclineToken={setDeclineToken}
        />
      )}
      <Modal
        ref={modalJoinTeam}
        title="Czy na pewno chcesz dołączyć do tej drużyny?">
        <AppButton
          mode="contained"
          disabled={isLoading}
          loading={isLoading}
          onPress={onAcceptInvite}>
          Dołącz
        </AppButton>
        <AppButton
          mode="contained"
          disabled={isLoading}
          loading={isLoading}
          onPress={onDeclineInvite}>
          Odrzuć
        </AppButton>
      </Modal>
    </Container>
  );
};
