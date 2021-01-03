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

  const onPressMatchJoinWithCode = async ({ code }: MatchCodeFormData) => {
    Keyboard.dismiss();

    try {
      //TODO: MUTATION TO JOIN MATCH WITH CODE
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
          matchList={matchList.data}
          onMarkerPress={(res) => onMarkerPressed(res)}
        />
      )}
      <View style={styles.FABGroup}>
        <FAB
          style={styles.fab}
          icon="plus"
          label="Wpisz kod"
          onPress={() => modalMatchCodeRef?.current?.snapTo(0)}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          label="Utwórz mecz"
          onPress={() => navigation.navigate('MatchCreate')}
        />
      </View>

      <Modal ref={modalMarkerPressedRef} title="Dołącz do meczu">
        <Text style={styles.textInModal}>
          Mecz
          {matchTemp?.rated === true ? ' rankingowy' : ' towarzyski'}
          {matchTemp?.rated === false ? `, stawka ${matchTemp.bet}` : ''}
        </Text>
        <AppButton mode="contained">Dołącz</AppButton>
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
          onPress={handleSubmit(onPressMatchJoinWithCode)}>
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
