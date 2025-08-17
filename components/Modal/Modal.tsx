"use client";

import css from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button className={css.button} onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Modal;
