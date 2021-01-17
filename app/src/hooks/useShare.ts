import { Share } from 'react-native';

export const useShare = () => {
  const share = async (message: string) => {
    return await Share.share({
      message,
    });
  };

  return { share };
};
