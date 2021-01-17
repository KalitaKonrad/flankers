import { Share } from 'react-native';

export const useShare = () => {
  const share = async (message: string) => {
    try {
      const result = await Share.share({
        message,
      });
      if (result.action === Share.sharedAction) {
        alert('Udostępniono');
      } else if (result.action === Share.dismissedAction) {
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return { share };
};
