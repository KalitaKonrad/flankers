import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface ListPlaceholderProps {
  placeholderCount: number;
}

export const ListPlaceholder: React.FC<ListPlaceholderProps> = ({
  placeholderCount,
}) => {
  const placeholderWidth = useWindowDimensions().width - 40;

  const placeholderList = useMemo(() => {
    return [...Array(placeholderCount)].map((index) => (
      <View key={index}>
        <SkeletonPlaceholder.Item
          width={placeholderWidth}
          height={50}
          paddingVertical={12}
          borderRadius={20}
          marginVertical={8}
        />
      </View>
    ));
  }, [placeholderCount, placeholderWidth]);

  return (
    <SkeletonPlaceholder>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {placeholderList}
      </View>
    </SkeletonPlaceholder>
  );
};
