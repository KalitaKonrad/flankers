import React from 'react';
import { Button, View } from 'react-native';
import { Text } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
interface ModalProps {}
export const Modal: React.FC<ModalProps> = ({ children }) => {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef<BottomSheet>(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current?.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
};
