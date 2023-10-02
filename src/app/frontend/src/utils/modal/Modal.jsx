import React from "react";
import "./Modal.css";
import { useModal } from "../../contexts/ModalContext";

function Modal() {
  const { modalState, closeModal } = useModal();

  if (!modalState.isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <span>{modalState.title}</span>
          <div className="close-button" onClick={closeModal}>
            <span>×</span>
          </div>
        </div>
        <div className="modal-content">{modalState.content}</div>
      </div>
    </div>
  );
}

export default Modal;
