import React, { createContext, useContext, useState } from 'react';

// Create a modal context
const ModalContext = createContext();

// Create a provider component to wrap your entire app
export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({ isOpen: false, content: null, title: null, errorMessage: undefined });

  // Function to open the modal
  const openModal = (title, content) => {
    setModalState({ isOpen: true, title, content });
  };

  // Function to close the modal
  const closeModal = () => {
    setModalState({ isOpen: false, title:null, content: null });
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

// Create a custom hook to use the modal context
export function useModal() {
  return useContext(ModalContext);
}
