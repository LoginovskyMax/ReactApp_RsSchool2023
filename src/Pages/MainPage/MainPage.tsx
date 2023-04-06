import { p } from 'vitest/dist/types-7cd96283';
import Card from '../../Components/Card/Card';
import Loading from '../../Components/Loading/Loading';
import Modal from '../../Components/Modal/Modal';
import { useEffect, useState } from 'react';
import { IProduct, IResponse} from '../responseData';
import { DetailedCard } from '../../Components/DetailedCard/DetailedCard';

const MainPage = () => {
  const [text, setText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad , setIsLoad] = useState(false)
  const [modalID, setModalID] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([])
  const [errorResponse, setErrorResponse] = useState(false)

  const showModal = (id: number) => {
    setIsModalOpen(true);
    setModalID(id);
  };

  const getCardsData = () => {
    setIsLoad(true)
    fetch(`https://dummyjson.com/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then<IResponse>((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products)
        setIsLoad(false)
      })
      .catch(error=> {
        setErrorResponse(true)
        console.log(error);
      })
  };

  useEffect(() => {
    if (text !== null) {
      localStorage.setItem('data', JSON.stringify(text));
    }
    if(errorResponse){
      setIsLoad(false)
    }
  }, [text, errorResponse]);

  useEffect(() => {
    if (localStorage.getItem('data')) {
      setText(JSON.parse(localStorage.getItem('data') as string));
    }
    getCardsData()
  }, []);

  return (
    <div className="mainPage" data-testid="main">
      <input
        type="text"
        onChange={(event) => {
          setText(() => event.target.value);
        }}
        value={text !== null ? text : ''}
        placeholder="Search..."
        className="mainPage__input"
        data-testid="main-input"
      />
      <button className="mainPage__btn">Search</button>
      <div className="mainPage__conteiner">
        {products.map((item: IProduct) => (
          <Card key={item.id} data={item} showModal={showModal} />
        ))}
      </div>
      {isModalOpen && <Modal setModalClosed={() => setIsModalOpen(false)}><DetailedCard id={modalID}/></Modal>}
      {isLoad && <Loading status={isLoad} />}
      {errorResponse && <p>Some server problems :-(</p>}
    </div>
  );
};

export default MainPage;
