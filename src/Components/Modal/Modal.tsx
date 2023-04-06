import { FC, ReactElement} from 'react';
import ReactDOM from 'react-dom';

import style from './Modal.module.scss';

interface ModalProps {
  setModalClosed: () => void;
  children:ReactElement
}

const Modal: FC<ModalProps> = ({ setModalClosed, children}) => {
 
  return ReactDOM.createPortal(
    <div className={style['modal-background']}>
      <div className={style['modal-wrapper']} onClick={setModalClosed} />
      <div className={style.modal}>
        <div className={style.modal__header}>
          <p className={style.modal__title}>Detailed information</p>
          <div className={style['modal__close-icon']} onClick={setModalClosed}>
            X
          </div>
        </div>
        <div className={style.modal__content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
