import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    return (
        <div id="modal">
            <div className={styles["modal-fade"]}></div>
            <div className={styles["modal-content"]}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
