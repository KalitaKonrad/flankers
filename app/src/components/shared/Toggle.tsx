import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import React, { useState } from 'react';

import { theme } from '../../theme';

interface ToggleProps {
  onSwitch: () => void;
  leftLabel: string;
  rightLabel: string;
}

export const Toggle: React.FC<ToggleProps> = (props) => {
  const [switchOn4, setSwitchOn4] = useState(false);

  return (
    <SwitchToggle
      buttonText={switchOn4 ? props.rightLabel : props.leftLabel}
      backTextRight={switchOn4 ? '' : props.rightLabel}
      backTextLeft={switchOn4 ? props.leftLabel : ''}
      type={1}
      buttonStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      }}
      rightContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      leftContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      buttonTextStyle={{ fontSize: 17, color: theme.colors.primary }}
      textRightStyle={{
        fontSize: 17,
        color: '#8c8f8e',
      }}
      textLeftStyle={{ fontSize: 17, color: '#8c8f8e' }}
      containerStyle={{
        marginTop: 16,
        width: 343,
        height: 50,
        borderRadius: 30,
        padding: 5,
      }}
      backgroundColorOn={theme.colors.background.darkGray}
      backgroundColorOff={theme.colors.background.darkGray}
      circleStyle={{
        width: 155,
        height: 55,
        borderRadius: 30,
        backgroundColor: 'blue', // rgb(102,134,205)
      }}
      switchOn={switchOn4}
      onPress={(): void => setSwitchOn4(!switchOn4)}
      circleColorOff={theme.colors.background.white}
      circleColorOn={theme.colors.background.white}
      duration={400}
    />
  );
};
