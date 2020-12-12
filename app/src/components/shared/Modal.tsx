import React, { useState } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import { theme } from '../../theme';

interface ModalProps {
  height?: number;
  // ref: React.Ref<BottomSheet | null>;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  isOpen,
  height,
}) => {
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const window = Dimensions.get('window');
  const sheetRef = React.useRef<BottomSheet>(null);

  const renderContent = () => (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 16,
        height: height ? height : 275,
      }}>
      {children}
    </View>
  );
  // const onClose = () => {
  //   Animated.timing(opacity, {
  //     toValue: 0,
  //     duration: 350,
  //     useNativeDriver: true,
  //   }).start();
  //   sheetRef?.current?.snapTo(0);
  //   setTimeout(() => {
  //     setIsOpen(false);
  //   }, 50);
  // };
  //
  // const onOpen = () => {
  //   this.setState({ isOpen: true });
  //   this.bs.current.snapTo(2);
  //   Animated.timing(this.state.opacity, {
  //     toValue: 0.7,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const renderBackDrop = () => (
    <Animated.View
      style={{
        opacity,
        backgroundColor: theme.colors.background.white,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <TouchableOpacity activeOpacity={1} onPress={onClose} />
    </Animated.View>
  );

  // const onClose = () => {
  //   isOpen = false;
  // };

  return (
    <View>
      <Button
        title="Open Bottom Sheet"
        onPress={() => sheetRef?.current?.snapTo(0)}
      />
      {isOpen
        ? renderBackDrop() && (
            <BottomSheet
              ref={sheetRef}
              snapPoints={[height ? height : 275, 0, 0]}
              borderRadius={20}
              renderContent={renderContent}
              enabledContentTapInteraction={false}
            />
          )
        : null}
    </View>
  );
};
