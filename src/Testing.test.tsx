import { render, screen } from '@testing-library/react';
import Card from './Components/Card';
import NotFound from './Pages/NotFound';
import MainPage from './Pages/MainPage';
import About from './Pages/About';
import products from './assets/products.json';

describe('Expected components in DOM', () => {
  it('not found created', () => {
    render(<NotFound></NotFound>);
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });
  it('card created', () => {
    render(<Card data={products[0]}></Card>);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
  it('100 cardds rendered', () => {
    products.map((item) => render(<Card data={item}></Card>));
    expect(screen.getAllByRole('img')).toHaveLength(100);
  });
  it('MainPage created', () => {
    render(<MainPage />);
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('mainPage__btn');
  });
  it('About created', () => {
    render(<About />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
