import { render, screen } from '@testing-library/react';
import Card from './Components/Card/Card';
import NotFound from './Pages/404/NotFound';
import MainPage from './Pages/MainPage/MainPage';
import About from './Pages/About/About';
import products from './assets/products.json';

describe('Expected components in DOM', () => {
  it('not found created', () => {
    render(<NotFound is404={()=>{}}></NotFound>);
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });
  it('card created', () => {
    render(<Card data={products[0]}></Card>);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
  it('100 cardds rendered', () => {
    products.map((item) => render(<Card data={item}></Card>));
    expect(screen.getAllByText('Description')).toHaveLength(100);
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
