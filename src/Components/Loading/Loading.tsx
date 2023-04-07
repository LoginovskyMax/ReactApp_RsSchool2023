import styles from './Loading.module.scss';
import { FC } from 'react';

interface IProps {
  status: boolean;
}

const Loading: FC<IProps> = ({ status }) => {
  return (
    <div className={styles[`loading${status ? '' : ' loading_hide'}`]}>
      <div className={styles['lds-ring']}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
