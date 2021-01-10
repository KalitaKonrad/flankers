import React from 'react';
import { Dimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface ListPlaceholderProps {
  placeholderCount: number;
}

export const ListPlaceholder: React.FC<ListPlaceholderProps> = ({
  placeholderCount,
}) => {
  const placeholderWidth = Dimensions.get('screen').width - 40;

  return (
    <SkeletonPlaceholder>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {[...Array(placeholderCount)].map((index) => (
          <View key={index}>
            <SkeletonPlaceholder.Item
              width={placeholderWidth}
              height={50}
              paddingVertical={12}
              borderRadius={20}
              marginVertical={8}
            />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};
