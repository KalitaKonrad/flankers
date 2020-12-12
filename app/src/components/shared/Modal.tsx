import React, { useEffect, useRef } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { theme } from '../../theme';

const { Value, onChange, call, cond, eq, abs, sub, min } = Animated;

interface ModalProps {
  snapPoints?: number[];
  isOpen: boolean;
  onClose: () => void;
  initialSnap?: number;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  initialSnap = null,
  snapPoints = [275, 0],
  isOpen,
  onClose,
}) => {
  const position = new Value(1);
  const opacity = min(abs(sub(position, 1)), 0.8);
  const zeroIndex = snapPoints.length - 1;
  const height = snapPoints[0];
  const sheet = useRef<BottomSheet | null>(null);

  useEffect(() => {
    if (sheet.current) {
      sheet.current.snapTo(initialSnap || 0);
    }
  }, []);

  const renderContent = () => (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondary,
        padding: 16,
        height: height ? height : 275,
      }}>
      {children}
    </View>
  );

  const handleOutsidePress = () => {
    sheet?.current?.snapTo(zeroIndex);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}>
      <TouchableNativeFeedback onPress={handleOutsidePress}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            backgroundColor: '#000',
            opacity,
          }}
        />
      </TouchableNativeFeedback>
      <Animated.Code
        exec={onChange(position, [cond(eq(position, 1), call([], onClose))])}
      />
      {isOpen && (
        <BottomSheet
          ref={sheet}
          snapPoints={[height ? height : 275, 0]}
          borderRadius={20}
          renderContent={renderContent}
          callbackNode={position}
          enabledContentTapInteraction={false}
        />
      )}
    </View>
  );
};
