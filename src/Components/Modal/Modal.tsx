import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import style from './Modal.module.scss';

interface ModalProps {
  setModalClosed: () => void;
  id: number;
}

const Modal: FC<ModalProps> = ({ setModalClosed, id }) => {
  const [cardData, setCardData] = useState({});

  const getCardData = () => {
    fetch(``, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setCardData(data));
  };

  useEffect(() => {
    getCardData();
  }, []);

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
        <div className={style.modal__content}>Hi</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
