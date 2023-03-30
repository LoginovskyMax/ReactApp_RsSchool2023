import styles from './Alert.module.scss';

interface IProps {
  text: string;
  show: boolean;
}

const Alert = ({ text, show }: IProps) => {
  return <div>{show && <p className={styles.text}>{text}</p>}</div>;
};

export default Alert;
