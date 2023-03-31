
import styles from './FormHook.module.scss';
import { useForm } from 'react-hook-form';
import FileInput from '../FileInput/FileInput';

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

export const FormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 
 
  return (
    <div className={styles.wrapper}>
    <form className={styles.form} onSubmit={handleSubmit((data) => console.log(data))}>

       <p className={styles.form__title}>Title</p>
      <input {...register('title',  { required: true })} />
      {errors.title && <p>title is required.</p>}

      <p className={styles.form__title}>Brand</p>
      <input {...register('brand', { required: true })} />
       {errors.brand && <p>brand is required.</p>}

       <p className={styles.form__title}>Description</p>
       <textarea
            placeholder="Add your description..."
            {...register('description', { required: true })}
            className={styles.form__area}
            data-testid="area"
          ></textarea>
         {errors.description && <p>description is required.</p>}

         <select
            {...register('category', { required: true })}
            className={styles.form__select}
          >
            <option value="0" key="0">
              Choose category
            </option>
            {categoryes.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.description && <p>category is required.</p>}
      
          <p className={styles.form__title}>Price</p>
          <input
            type="number"
            placeholder="Add price"
            {...register('price', { required: true })}
            className={styles.form__text_inp}
          />
           {errors.description && <p>price is required.</p>}
      
           <label className={styles.form__title}>
            Add 15% discount
            <input type="checkbox" {...register('discount')} data-testid="check" />
          </label>

          <fieldset className={styles.form__field}>
            <p className={styles.form__title}>Stock</p>
            {stocks.map((val) => (
              <label key={val}>
                {val}
                <input type="radio"
                       {...register('stock', { required: true })}
                       name="stock" value={val} 
                       defaultChecked={val === 10}
                       />
              </label>
            ))}
          </fieldset>
          {errors.description && <p>stock is required.</p>}

          <FileInput
            deleteError={() => {}}
            reset={false}
            register={register}
          />

      <p className={styles.form__title}>Production date</p>
      <input {...register('date',  { required: true })} type='date'/>
      {errors.date && <p>Please enter date</p>}
      <button type="submit">Create</button>
    </form>
    </div>
  )
}
