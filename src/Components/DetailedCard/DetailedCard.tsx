import { useEffect, useRef, useState } from 'react';
import { IProduct } from '../../Pages/responseData';
import styles from './DetailedCard.module.scss';
import Loading from '../Loading/Loading';
interface IProps {
  id: number;
}

export const DetailedCard = ({ id }: IProps) => {
  const [imageURL, setImageURL] = useState('');
  const [data, setData] = useState<IProduct | undefined>();
  const [hide, setHide] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const canClick = useRef(true);

  const getCardData = () => {
    setIsLoad(true);
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then<IProduct>((response) => response.json())
      .then((data) => {
        setData(data);
        setImageURL(data.images[0]);
        setIsLoad(false);
      });
  };

  const showNext = () => {
    if (data && canClick.current) {
      canClick.current = false;
      setHide(true);
      setTimeout(() => {
        setHide(false);
        let currentImg = data.images.findIndex((img) => img === imageURL) + 1;
        if (currentImg === data.images.length) {
          currentImg = 0;
        }
        setImageURL(data.images[currentImg]);
      }, 300);
      setTimeout(() => {
        canClick.current = true;
      }, 600);
    }
  };

  const showPrev = () => {
    if (data && canClick.current) {
      canClick.current = false;
      setHide(true);
      setTimeout(() => {
        setHide(false);
        let currentImg = data.images.findIndex((img) => img === imageURL) - 1;
        if (currentImg === -1) {
          currentImg = data.images.length - 1;
        }
        setImageURL(data.images[currentImg]);
      }, 300);
      setTimeout(() => {
        canClick.current = true;
      }, 600);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <div className={styles.card} data-testid = 'detailedPage'>
      <div className={styles.card__img_block}>
        <div
          style={{ backgroundImage: `url('${imageURL}')` }}
          className={hide ? styles.hide : styles.card__image}
        />
        <div className={styles.card__btns_block}>
          <button type="button" className={styles.card__btn} onClick={showPrev}>
            Prev
          </button>
          <button type="button" className={styles.card__btn} onClick={showNext}>
            Next
          </button>
        </div>
      </div>
      {data && (
        <div>
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

          <p className={styles.card__description} data-testid="description">
            <strong>Description :</strong>
            {data.description}
          </p>

          <p>
            <strong>Price: </strong>
            {data.price} $
          </p>
          <p>
            <strong>Stock:</strong> {data.stock}
          </p>
          <p>
            <strong>Rating :</strong>
            {data.rating}
          </p>
        </div>
      )}
      {isLoad && <Loading status={isLoad} />}
    </div>
  );
};
