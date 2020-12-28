import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import { Text } from 'react-native-paper';

import { MapViewComponent } from '../../components/map/MapView';
import { InlineHeader } from '../../components/shared/InlineHeader';
import { Modal } from '../../components/shared/Modal';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useMatchListQuery } from '../../hooks/useMatchListQuery';
import { TextStyle, theme } from '../../theme';
import { MatchResponse } from '../../types/matchResponse';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchJoinFromMapScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchJoinFromMap'>;

const heatPoints = [
  { latitude: 50.06865225060835, longitude: 19.906365908682346, weight: 80 },
];

export const MatchJoinFromMapScreen: React.FC<MatchJoinFromMapScreenProps> = ({
  navigation,
}) => {
  const matchList = useMatchListQuery();

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const closeModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [error, setError] = useState('');

  const [matchTemp, setMatchTemp] = useState<MatchResponse>();

  const onMarkerPressed = (match: MatchResponse) => {
    setModalVisible(true);
    setMatchTemp(match);
  };
  const onJoinMatch = () => {};

  return (
    <>
      {matchList.data !== undefined && (
        <MapViewComponent
          matchList={matchList.data}
          onMarkerPress={(res) => onMarkerPressed(res)}
        />
      )}

      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <InlineHeader center>
            <Text style={[TextStyle.noteH2]}>Dołącz do meczu</Text>
          </InlineHeader>
          <Text style={styles.textInModal}>
            Mecz
            {matchTemp?.rated === true ? ' rankingowy' : ' towarzyski'}
            {matchTemp?.rated === false ? `, stawka ${matchTemp.bet}` : ''}
          </Text>
          <SubmitButton
            mode="text"
            labelColor={theme.colors.white}
            backgroundColor={error ? theme.colors.error : theme.colors.primary}
            onPress={onJoinMatch}>
            Dołącz
          </SubmitButton>
          {error === '' && (
            <SubmitButton
              mode="text"
              labelColor={theme.colors.primary}
              backgroundColor={theme.colors.white}
              onPress={closeModal}>
              Powrót do mapy
            </SubmitButton>
          )}
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInModal: {
    textAlign: 'center',
  },
});
