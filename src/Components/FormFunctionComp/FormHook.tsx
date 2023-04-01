import styles from './FormHook.module.scss';
import { useForm, FieldValues } from 'react-hook-form';
import FileInput from '../FileInput/FileInput';
import { useEffect, useState } from 'react';
import Alert from '../Alert/Alert';
import { IProduct } from '../../Pages/MainPage/MainPage';

const categoryes = [
  'smartphones',
  'laptops',
  'fragrances',
  'skincare',
  'groceries',
  'home-decoration',
  'furniture',
  'womens-dresses ',
];
const stocks = [10, 50, 100];

interface IProps {
  addCard: (newCard: IProduct) => void;
}

export const FormHook = ({ addCard }: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [showModal, setShowModal] = useState(false);

  const onsubmit = (data: FieldValues) => {
    const newCard = {
      id: Date.now(),
      brand: data.brand,
      description: data.description,
      price: parseFloat(data.price),
      rating: 5,
      stock: data.price,
      thumbnail: URL.createObjectURL(data.file[0]),
      title: data.title,
      discountPercentage: data.di,
      images: data.discount,
      category: data.category,
    };
    addCard(newCard);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit((data) => onsubmit(data))}>
        <p className={styles.form__title}>Title</p>
        <input {...register('title', { required: true })} />
        <Alert text="Add title" show={errors.title} />

        <p className={styles.form__title}>Brand</p>
        <input {...register('brand', { required: true })} />
        <Alert text="Add brand" show={errors.brand} />

        <p className={styles.form__title}>Description</p>
        <textarea
          placeholder="Add your description..."
          {...register('description', { required: true })}
          className={styles.form__area}
          data-testid="area"
        ></textarea>
        <Alert text="Add description" show={errors.description} />

        <select {...register('category', { required: true })} className={styles.form__select}>
          <option value="" key="0">
            Choose category
          </option>
          {categoryes.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <Alert text="Add category" show={errors.category} />

        <p className={styles.form__title}>Price</p>
        <input
          type="number"
          placeholder="Add price"
          {...register('price', { required: true })}
          className={styles.form__text_inp}
        />
        <Alert text="Add price" show={errors.price} />

        <label className={styles.form__title}>
          Add 15% discount
          <input
            type="checkbox"
            {...register('discount', { required: true })}
            data-testid="check"
          />
        </label>
        <Alert text="Discount is required" show={errors.discount} />

        <fieldset className={styles.form__field}>
          <p className={styles.form__title}>Stock</p>
          {stocks.map((val) => (
            <label key={val}>
              {val}
              <input
                type="radio"
                {...register('stock', { required: true })}
                name="stock"
                value={val}
              />
            </label>
          ))}
        </fieldset>
        <Alert text="Choose stock" show={errors.stock} />

        <FileInput register={register} reset={showModal} />
        <Alert text="Add file" show={errors.file} />

        <p className={styles.form__title}>Production date</p>
        <input {...register('date', { required: true })} type="date" />
        <Alert text="Please enter date" show={errors.date} />

        <button type="submit">Create</button>
      </form>

      {showModal && <div className={styles.form__succes}>Card created!</div>}
    </div>
  );
};
