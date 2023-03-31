import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Route, Router, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Card from './Components/Card/Card';
import NotFound from './Pages/404/NotFound';
import MainPage from './Pages/MainPage/MainPage';
import About from './Pages/About/About';
import Form from './Components/FormComponent/Form';
import AddCard from './Pages/AddCard/AddCard';
import FileInput from './Components/FileInput/FileInput';
import Alert from './Components/Alert/Alert';
import products from './assets/products.json';

describe('Expected components in DOM', () => {
  it('not found created', () => {
    render(<NotFound is404={(yes=false)=>{}}/>)
  
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
  it('AddCard created', () => {
    render(<AddCard />);
    expect(screen.getByText('You can create a new card here')).toBeInTheDocument();
  });

  it('fileInput created', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<FileInput image={ref} deleteError={() => {}} reset={false} />);
    expect(screen.getByText('Choose image')).toBeInTheDocument();
  });
  it('Alert created', () => {
    render(<Alert text="Add" show={true} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});

describe('Expected form in DOM', () => {
  it('Form created', async () => {
    render(<Form />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Choose category')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Add 15% discount')).toBeInTheDocument();
    expect(screen.getByText('Production date')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(screen.getByTestId('check'));
      expect(screen.getByTestId('check')).toBeChecked();
      await userEvent.type(screen.getByTestId('area'), 'Hello');
      expect(screen.getByTestId('area')).toHaveValue('Hello');
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Create')).toBeInTheDocument();
    });
  });
});
