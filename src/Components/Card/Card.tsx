import React, { Component } from 'react';
import styles from './Card.module.scss';
import { IProduct } from '../../Pages/MainPage/MainPage';

interface IProps {
  data: IProduct;
}
interface IState {
  visible: boolean;
}

class Card extends Component<IProps, IState> {
  data: IProduct;
  constructor(props: IProps) {
    super(props);
    this.data = props.data;
    this.state = { visible: false };
  }

  render() {
    return (
      <div className={styles.card}>
        <div
          style={{ backgroundImage: `url('${this.data.thumbnail}')` }}
          className={styles.card__image}
        />
        <p>
          <strong>Name :</strong>
          {this.data.title}
        </p>
        <p>
          <strong>Brand :</strong>
          {this.data.brand}
        </p>
        <p>
          <strong>Category :</strong>
          {this.data.category}
        </p>
        <p
          onMouseEnter={() => this.setState({ visible: true })}
          onMouseLeave={() => this.setState({ visible: false })}
          className={styles.card__descriptor}
        >
          Description
        </p>
        {this.state.visible && <p className={styles.card__description}>{this.data.description}</p>}
        <p>
          <strong>Price: </strong>
          {this.data.price} $
        </p>
        <p>
          <strong>Stock:</strong> {this.data.stock}
        </p>
      </div>
    );
  }
}

export default Card;
