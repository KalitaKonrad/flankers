import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { FAB, HelperText, Text } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import * as yup from 'yup';

import { ActiveMatchesMap } from '../../components/map/ActiveMatchesMap';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { Modal } from '../../components/shared/modal/Modal';
import { useGameInviteQuery } from '../../hooks/useGameInviteQuery';
import { useMatchListQuery } from '../../hooks/useMatchListQuery';
import { MatchResponse } from '../../types/matchResponse';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchJoinFromMapScreenProps = StackScreenProps<
  MatchScreenStackParamList,
  'MatchJoinFromMap'
>;
type MatchCodeFormData = {
  code: string;
};

const MatchCodeSchema = yup.object().shape({
  code: yup.string().required('Wpisz kod gry aby dołączyć'),
});

export const MatchJoinFromMapScreen: React.FC<MatchJoinFromMapScreenProps> = ({
  navigation,
}) => {
  const matchList = useMatchListQuery();

  const [matchTemp, setMatchTemp] = useState<MatchResponse>();
  const modalMarkerPressedRef = useRef<BottomSheet | null>(null);
  const modalMatchCodeRef = useRef<BottomSheet | null>(null);
  const [codeToJoin, setCodeToJoin] = useState<string>('');

  const gameFromCode = useGameInviteQuery(codeToJoin);
  console.log('++++++++++++++++++++++++++++++', gameFromCode.data?.id);

  const [fabState, setFabState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setFabState({ open });

  const { open } = fabState;

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<MatchCodeFormData>({
    resolver: yupResolver(MatchCodeSchema),
  });

  const onMarkerPressed = (match: MatchResponse) => {
    modalMarkerPressedRef?.current?.snapTo(0);
    setMatchTemp(match);
  };

  const onMatchJoinFromMarker = () => {
    if (matchTemp !== undefined) {
      modalMarkerPressedRef?.current?.snapTo(1);
      navigation.push('MatchInLobby', { gameId: matchTemp?.id });
    }
  };

  const onMatchJoinWithCodePress = async ({ code }: MatchCodeFormData) => {
    Keyboard.dismiss();
    setCodeToJoin(code);

    try {
      if (gameFromCode.isFetched && gameFromCode.data?.id !== undefined) {
        modalMatchCodeRef?.current?.snapTo(1);
        console.log('======>', gameFromCode.data);
        navigation.push('MatchInLobby', { gameId: gameFromCode.data?.id });
      }
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };

  useEffect(() => {
    register('code');
  }, [register]);

  return (
    <View style={styles.container}>
      {matchList.data !== undefined && (
        <ActiveMatchesMap
          matchList={matchList.data ?? []}
          onMarkerPress={(res) => onMarkerPressed(res)}
        />
      )}

      <FAB.Group
        visible
        open={open}
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'textbox',
            label: 'Wpisz kod',
            onPress: () => modalMatchCodeRef?.current?.snapTo(0),
          },
          {
            icon: 'flag-plus',
            label: 'Utwórz mecz',
            onPress: () => navigation.navigate('MatchCreate'),
          },
        ]}
        onStateChange={onStateChange}
      />

      <Modal ref={modalMarkerPressedRef} title="Dołącz do meczu">
        <Text style={styles.textInModal}>
          Mecz
          {matchTemp?.rated ? ' rankingowy' : ' towarzyski'}
          {matchTemp?.rated ? `, stawka ${matchTemp.bet}` : ''}
        </Text>
        <AppButton mode="contained" onPress={onMatchJoinFromMarker}>
          Dołącz
        </AppButton>
      </Modal>

      <Modal ref={modalMatchCodeRef} title="Wpisz kod gry">
        <AppInput
          style={{ marginBottom: 7, marginTop: 20, marginHorizontal: 10 }}
          label="Kod gry"
          onChangeText={(text) => setValue('code', text)}
        />
        {!!errors.code && (
          <HelperText type="error" visible={!!errors.code}>
            {errors.code?.message}
          </HelperText>
        )}
        <AppButton
          mode="contained"
          onPress={handleSubmit(onMatchJoinWithCodePress)}>
          Dołącz
        </AppButton>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    bottom: 16,
    backgroundColor: '#fff',
    width: 170,
  },
  textInModal: {
    textAlign: 'center',
  },
  FABGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
