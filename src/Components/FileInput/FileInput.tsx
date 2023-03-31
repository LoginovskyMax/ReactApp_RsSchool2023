import { useEffect, useState } from 'react';
import styles from './FileInput.module.scss';
import svg from '../../assets/download.png';
import {
  FieldValues,
  UseFormRegister,
  // useForm, // don't need this import
} from "react-hook-form";

interface IProps {
  image?: React.RefObject<HTMLInputElement>;
  deleteError: () => void;
  reset: boolean;
  register?:UseFormRegister<FieldValues>
}

const FileInput = ({ image, deleteError, reset }: IProps) => {
  const [path, setPath] = useState('');
  const [showImg, setShowImg] = useState(false);

  const setImg = () => {
    if(image){
      if (image.current !== null && image.current.files !== null) {
        setPath(URL.createObjectURL(image.current.files[0]));
      }
      deleteError();
      setShowImg(true);
    }

   
  };
  useEffect(() => {
    setShowImg(false);
  }, [reset]);

  return (
    <div className={styles.input__wrapper}>
      <input
        name="file"
        type="file"
        id="input__file"
        className={styles.input__file}
        ref={image}
        accept="image/*"
        onInput={setImg}
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
