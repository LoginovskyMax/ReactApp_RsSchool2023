import styles from './Alert.module.scss';

interface IProps {
  text: string;
  show: boolean;
}

const Alert = ({ text, show }: IProps) => {
  return show && <p className={styles.text}>{text}</p>;
};

export default Alert;
