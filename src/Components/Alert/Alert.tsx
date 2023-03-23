import { Component } from 'react';
import styles from './Alert.module.scss';

interface IProps {
  text: string;
  show: boolean;
}

export default class Alert extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return this.props.show && <p className={styles.text}>{this.props.text}</p>;
  }
}
