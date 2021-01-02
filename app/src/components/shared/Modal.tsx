import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

export interface ModalProps {
  title: string;
}

export const Modal = React.forwardRef<BottomSheet, ModalProps>((_, ref) => {
  return <div>Modal not available on web</div>;
});
