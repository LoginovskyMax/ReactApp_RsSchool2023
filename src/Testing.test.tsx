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
import Header from './Components/Header/Header';
import products from './assets/products.json';
import { vi } from 'vitest';
import * as router from 'react-router';
import { FormHook } from './Components/FormFunctionComp/FormHook';
import { useForm } from 'react-hook-form';
import App from './App';
import { DetailedCard } from './Components/DetailedCard/DetailedCard';
import Modal from './Components/Modal/Modal';
import { ResultList } from './Components/ResultList/ResultList';
import Loading from './Components/Loading/Loading';
import { Provider } from 'react-redux';
import { store } from './redux/store';

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
  const mockFunc = (id: number) => {
    id / 2;
    return;
  };

  it('not found created', () => {
    render(<NotFound is404={() => {}} />);
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  it('card created', async () => {
    render(<Card data={products[0]} showModal={mockFunc}></Card>);
    expect(screen.getByText('Description')).toBeInTheDocument();
    await act(async () => {
      await userEvent.hover(screen.getByText('Description'));
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  it('100 cardds rendered', () => {
    products.map((item) => render(<Card data={item} showModal={mockFunc}></Card>));
    expect(screen.getAllByText('Description')).toHaveLength(100);
  });

  it('MainPage created', async () => {
    localStorage.setItem('data', JSON.stringify(''));
    render(
      <Provider store={store}>
        <MainPage></MainPage>
      </Provider>
    );

    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('resultList')).toBeInTheDocument();
    const card = await screen.findByTestId('clickedCard');
    expect(card).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(screen.getByTestId('main-input'), 'Hello');
      expect(screen.getByTestId('main-input')).toHaveValue('Hello');
      await userEvent.click(card);
      expect(await screen.findByText('iPhone 9')).toBeInTheDocument();
    });
  });

  it('About created', () => {
    render(<About />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('AddCard created', () => {
    render(
      <Provider store={store}>
        <AddCard />
      </Provider>
    );
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

  it('Header created', async () => {
    render(
      <router.MemoryRouter initialEntries={['/']}>
        <Header is404={false} />
      </router.MemoryRouter>
    );
    expect(screen.getAllByRole('link')).toHaveLength(3);

    await act(async () => {
      await userEvent.click(screen.getByTestId('link-main'));
      expect(screen.getByText('Main page')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('link-about'));
      expect(screen.getByText('About')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('link-add'));
      expect(screen.getByText('Add card')).toBeInTheDocument();
    });
  });

  it('Alert created', () => {
    render(<Alert text="Add" show={true} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('Modal created', () => {
    render(
      <Modal setModalClosed={() => {}}>
        <ResultList products={products} showModal={mockFunc}></ResultList>
      </Modal>
    );
    expect(screen.getByText('Detailed information')).toBeInTheDocument();
  });

  it('Loading created', () => {
    render(<Loading status={true} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Loading have right class', () => {
    render(<Loading status={false} />);
    expect(screen.getByTestId('loading')).toHaveClass('_loadingloading_hide_b532a7');
  });

  it('Detailed card created', async () => {
    render(
      <Provider store={store}>
        <DetailedCard id={1} />
      </Provider>
    );

    expect(screen.getByTestId('detailedPage')).toBeInTheDocument();
    expect(await screen.findByText('iPhone 9')).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(screen.getByText('Next'));
      expect(screen.getByTestId('imageDiv')).toBeInTheDocument();

      await userEvent.click(screen.getByText('Prev'));
      expect(screen.getByTestId('imageDiv')).toHaveClass('_card__image_a18fb6');
    });
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
    render(
      <Provider store={store}>
        <FormHook />
      </Provider>
    );
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

      await userEvent.type(screen.getByTestId('title'), 'Hello');
      expect(screen.getByTestId('title')).toHaveValue('Hello');

      await userEvent.type(screen.getByTestId('brand'), 'Hello');
      expect(screen.getByTestId('brand')).toHaveValue('Hello');

      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Create')).toBeInTheDocument();
    });
  });
});

describe('routing tests', () => {
  it('bad route', () => {
    const badRoute = '/some/bad/route';
    render(
      <router.MemoryRouter initialEntries={[badRoute]}>
        <App />
      </router.MemoryRouter>
    );
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  it('add route', () => {
    const addCard = '/add';
    render(
      <router.MemoryRouter initialEntries={[addCard]}>
        <Provider store={store}>
          <App />
        </Provider>
      </router.MemoryRouter>
    );
    expect(screen.getByText(/You can create a new card here/i)).toBeInTheDocument();
  });

  it('about route', () => {
    const route = '/about';
    render(
      <router.MemoryRouter initialEntries={[route]}>
        <App />
      </router.MemoryRouter>
    );
    expect(screen.getByText(/RS School/i)).toBeInTheDocument();
  });
});
