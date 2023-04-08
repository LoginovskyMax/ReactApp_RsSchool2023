import { useState } from 'react';
import styles from './Card.module.scss';
import { IProduct } from '../../Pages/responseData';

interface IProps {
  data: IProduct;
  showModal: (id: number) => void;
}

const Card = ({ data, showModal }: IProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.card} onClick={() => showModal(data.id)} data-testid = 'clickedCard'>
      <div style={{ backgroundImage: `url('${data.thumbnail}')` }} className={styles.card__image} />
      <p>
        <strong>Name :</strong>
        {data.title}
      </p>
      <p>
        <strong>Brand :</strong>
        {data.brand}
      </p>
      <p>
        <strong>Category :</strong>
        {data.category}
      </p>
      <p
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={styles.card__descriptor}
      >
        Description
      </p>
      {visible && (
        <p className={styles.card__description} data-testid="description">
          {data.description}
        </p>
      )}
      <p>
        <strong>Price: </strong>
        {data.price} $
      </p>
      <p>
        <strong>Stock:</strong> {data.stock}
      </p>
    </div>
  );
};

export default Card;
