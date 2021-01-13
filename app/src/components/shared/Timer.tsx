import React, { useEffect, useState } from 'react';

import RoundInformation from './RoundInformation';

interface TimerProps {
  subText?: string;
}

const formatSeconds = (seconds: number) => {
  const minutes = ('0' + Math.floor(seconds / 60)).slice(-2);
  const secondsMod = ('0' + (seconds % 60)).slice(-2);

  return `${minutes}:${secondsMod}`;
};

export const Timer: React.FC<TimerProps> = ({ subText }) => {
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState('00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimer(formatSeconds(seconds));
  }, [seconds]);

  return <RoundInformation mainText={timer} subText={subText} />;
};
