import { useEffect, useState } from 'react';
import styles from './FileInput.module.scss';
import svg from '../../assets/download.png';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  reset: boolean;
}

const FileInput = ({ register, reset }: IProps) => {
  const [path, setPath] = useState('');
  const [showImg, setShowImg] = useState(false);

  const setImg = (e: EventTarget & HTMLInputElement) => {
    if (e.files !== null) setPath(URL.createObjectURL(e.files[0]));
    setShowImg(true);
  };

  useEffect(() => {
    setShowImg(false);
  }, [reset]);

  return (
    <div className={styles.input__wrapper}>
      <input
        {...register('file', { required: true })}
        type="file"
        id="input__file"
        className={styles.input__file}
        accept="image/*"
        data-testid="input-file"
        onInput={(e) => setImg(e.currentTarget)}
      />
      <label htmlFor="input__file" className={styles.input__file_button}>
        <span className={styles['input__file-icon-wrapper']}>
          <img className={styles['input__file-icon']} src={svg} alt="img" width="35" />
        </span>
        <span className={styles['input__file-button-text']}>Choose image</span>
        {showImg && (
          <img className={styles['input__file-load-img']} src={path} alt="img" height="58" />
        )}
      </label>
    </div>
  );
};

export default FileInput;
