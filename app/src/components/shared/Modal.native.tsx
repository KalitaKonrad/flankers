import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Portal } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { AppText } from './AppText';
import { ModalProps } from './Modal';

const MODAL_HEIGHT = 295;
const SNAP_POINTS = [MODAL_HEIGHT, 0];

export const Modal = React.forwardRef<BottomSheet, ModalProps>(
  ({ title, children }, ref) => {
    const [isOpen, setOpen] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const close = () => {
      (ref as any)?.current?.snapTo(SNAP_POINTS.length - 1);
    };

    const onBackdropPress = () => {
      close();
    };

    const onHardwareBackPress = () => {
      if (isOpen) {
        close();
        return true;
      }
      return false;
    };

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onHardwareBackPress
        );
    });

    const renderContent = () => {
      return (
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />
          <AppText variant="h2" style={styles.modalTitle}>
            {title}
          </AppText>
          <View style={styles.modalContent}>{children}</View>
        </View>
      );
    };

    return (
      <Portal>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View
            pointerEvents={isOpen ? 'auto' : 'none'}
            style={[
              StyleSheet.absoluteFill,
              styles.backdrop,
              { opacity: Animated.sub(1, fadeAnim) },
            ]}
          />
        </TouchableWithoutFeedback>
        <BottomSheet
          initialSnap={SNAP_POINTS.length - 1}
          ref={ref}
          snapPoints={SNAP_POINTS}
          borderRadius={10}
          callbackNode={fadeAnim}
          renderContent={renderContent}
          enabledContentTapInteraction={false}
          onOpenEnd={() => setOpen(true)}
          onCloseEnd={() => setOpen(false)}
        />
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    height: MODAL_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
  },
  modalHandle: {
    width: 32,
    height: 4,
    backgroundColor: '#E8E8E8',
    borderRadius: 100,
    marginBottom: 24,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  modalContent: {
    flex: 1,
    width: '100%',
  },
});
