import React, { ReactNode } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';

export interface ModalProps {
  children: ReactNode;
  title: string;
}

export const Modal = React.forwardRef<BottomSheet, ModalProps>(
  ({ children }, ref) => {
    return <div>{children}</div>;
  }
);
