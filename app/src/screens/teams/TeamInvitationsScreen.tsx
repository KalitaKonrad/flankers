import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import { Container } from '../../components/layout/Container';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { ListPlaceholder } from '../../components/shared/ListPlaceholder';
import { Modal } from '../../components/shared/modal/Modal';
import { TeamInvitesList } from '../../components/team/TeamInvitesList';
import { useInvitationAcceptMutation } from '../../hooks/invitation/useInvitationAcceptMutation';
import { useInvitationDeclineMutation } from '../../hooks/invitation/useInvitationDeclineMutation';
import { useTeamInvitationsQuery } from '../../hooks/team/useTeamInvitationsQuery';
import { useAlert } from '../../hooks/useAlert';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamInvitationsScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamInvitations'
>;

export const TeamInvitationsScreen: React.FC<TeamInvitationsScreenProps> = ({
  route,
  navigation,
}) => {
  const invites = useTeamInvitationsQuery();
  const invitesList = invites?.data?.data ?? [];

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
      navigation.navigate('TeamManage');
    } catch (e) {
      showAlert(
        'Ups!',
        'Wystąpił problem podczas próby zaakceptowania zaproszenia do drużyny',
        () => modalJoinTeam?.current?.snapTo(1)
      );
    } finally {
      modalJoinTeam?.current?.snapTo(1);
    }
  }, [acceptInvitation, acceptToken, navigation, showAlert, userTeam]);

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
      ) : invitesList?.length !== 0 ? (
        <TeamInvitesList
          invites={invitesList}
          modalRef={modalJoinTeam}
          setAcceptToken={setAcceptToken}
          setDeclineToken={setDeclineToken}
        />
      ) : (
        <View style={styles.noInvitesContainer}>
          <AppText style={styles.noInvites}>
            Nie masz żadnych zaproszeń.
          </AppText>
        </View>
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
          mode="outlined"
          disabled={isLoading}
          loading={isLoading}
          onPress={onDeclineInvite}>
          Odrzuć
        </AppButton>
      </Modal>
    </Container>
  );
};
const styles = StyleSheet.create({
  noInvites: {
    fontSize: 16,
  },
  noInvitesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});
