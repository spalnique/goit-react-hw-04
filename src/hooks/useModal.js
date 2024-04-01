import { useState } from 'react';

export function useModal(initialValue) {
  const [modal, setModal] = useState(initialValue);
  const open = (imageData) =>
    setModal((prevModal) => ({
      ...prevModal,
      visible: true,
      image: imageData,
    }));
  const close = () =>
    setModal((prevModal) => ({ ...prevModal, visible: false, image: null }));
  return { modal, open, close };
}
