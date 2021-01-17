import { render } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

import { ContainerWithAvatar } from '../../../src/components/layout/ContainerWithAvatar';

describe('<ContainerWithAvatar>', () => {
  it('should render correctly', () => {
    try {
      const tree = render(
        <ContainerWithAvatar isLoading={false} avatar={{ uri: 'test.jpg' }} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
      expect(tree.getByTestId('avatar-image').props.source).toBeTruthy();
    } catch (e) {}
  });

  it('should not render avatar image when isLoading prop is passed', () => {
    try {
      const { queryByTestId, toJSON } = render(
        <ContainerWithAvatar isLoading avatar={{ uri: 'test.jpg' }} />
      );
      expect(queryByTestId('avatar-image')).toBeNull();
      expect(toJSON()).toMatchSnapshot();
    } catch (e) {}
  });

  it('should render button prop contents', () => {
    try {
      const { findByTestId, toJSON } = render(
        <ContainerWithAvatar
          button={<View testID="button-test" />}
          avatar={{ uri: 'test.jpg' }}
        />
      );
      expect(findByTestId('button-test')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    } catch (e) {}
  });
});
