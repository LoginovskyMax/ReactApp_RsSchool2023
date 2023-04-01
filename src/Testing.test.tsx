import { render, screen, act } from '@testing-library/react';
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
import { vi } from 'vitest';
import * as router from 'react-router';
import { FormHook } from './Components/FormFunctionComp/FormHook';
import { useForm } from 'react-hook-form';

const MockComp = () => {
  const { register } = useForm();
  return <FileInput register={register} reset={false}></FileInput>;
};

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
});

describe('Expected components in DOM', () => {
  window.URL.createObjectURL = vi.fn();
  it('not found created', () => {
    render(<NotFound is404={() => {}} />);
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  it('card created', async () => {
    render(<Card data={products[0]}></Card>);
    expect(screen.getByText('Description')).toBeInTheDocument();
    await act(async () => {
      await userEvent.hover(screen.getByText('Description'));
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  it('100 cardds rendered', () => {
    products.map((item) => render(<Card data={item}></Card>));
    expect(screen.getAllByText('Description')).toHaveLength(100);
  });

  it('MainPage created', async () => {
    render(<MainPage />);
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('mainPage__btn');
    await act(async () => {
      await userEvent.type(screen.getByTestId('main-input'), 'Hello');
      expect(screen.getByTestId('main-input')).toHaveValue('Hello');
    });
  });
  it('About created', () => {
    render(<About />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('AddCard created', () => {
    render(<AddCard />);
    expect(screen.getByText('You can create a new card here')).toBeInTheDocument();
  });

  it('fileInput created', async () => {
    const fakeFile = new File(['someFile'], 'someFile.jpeg', { type: 'image/jpeg' });
    render(<MockComp />);
    const input = screen.getByTestId('input-file') as HTMLInputElement;
    expect(screen.getByText('Choose image')).toBeInTheDocument();
    await act(async () => {
      await userEvent.upload(input, fakeFile);
      if (input.files) expect(input.files[0]).toStrictEqual(fakeFile);
    });
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

describe('Expected FormHook in DOM', () => {
  it('FormHook created', async () => {
    render(<FormHook addCard={() => {}} />);
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
