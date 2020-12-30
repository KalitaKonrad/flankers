import { Dispatch, SetStateAction } from 'react';

export interface ModalProps {
  snapPoints?: number[];
  initialSnap?: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
