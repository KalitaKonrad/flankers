import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Dimensions, TouchableNativeFeedback, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import { theme } from '../../theme';
import { ModalProps } from '../../types/modalCompoentProps';

export const Modal: React.FC<ModalProps> = ({
  children,
  initialSnap = null,
  snapPoints = [275, 0],
  isOpen,
  setIsOpen,
}) => {
  const zeroIndex = snapPoints.length - 1;
  const sheet = useRef<BottomSheet | null>(null);

  useEffect(() => {
    if (sheet.current) {
      sheet.current.snapTo(initialSnap || 0);
    }
  }, [isOpen]);

  const renderContent = () => (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondary,
        padding: 16,
        height: 275,
        width: Dimensions.get('window').width,
      }}>
      {children}
    </View>
  );

  // TODO: add this functionality
  const handleOutsidePress = () => {
    sheet?.current?.snapTo(zeroIndex);
  };

  return (
    <TouchableNativeFeedback
      onPress={handleOutsidePress}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: theme.colors.white,
      }}>
      <BottomSheet
        ref={sheet}
        snapPoints={snapPoints}
        borderRadius={10}
        renderContent={renderContent}
        onCloseEnd={() => setIsOpen(false)}
        enabledContentTapInteraction={false}
      />
    </TouchableNativeFeedback>
  );
};
