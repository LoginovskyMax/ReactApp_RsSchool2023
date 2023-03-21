import React, { Component } from 'react';
import Card from '../../Components/Card/Card';
import products from '../../assets/products.json';

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface State {
  time: number;
  text: string;
}

class MainPage extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { time: 0, text: '' };
  }

  inputText = (event: string) => {
    this.setState({ text: event });
  };

  componentDidMount() {
    if (localStorage.getItem('data')) {
      this.setState({ text: JSON.parse(localStorage.getItem('data') as string) });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('data', JSON.stringify(this.state.text));
  }

  render() {
    return (
      <div className="mainPage" data-testid="main">
        <input
          type="text"
          onChange={(event) => {
            this.inputText(event.target.value);
          }}
          value={this.state.text}
          className="mainPage__input"
        />
        <button className="mainPage__btn">Search</button>
        <div className="mainPage__conteiner">
          {products.map((item: IProduct) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default MainPage;
