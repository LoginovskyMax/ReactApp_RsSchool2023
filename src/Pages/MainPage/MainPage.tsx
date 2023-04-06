import Card from '../../Components/Card/Card';
import Modal from '../../Components/Modal/Modal';
import products from '../../assets/products.json';
import { useEffect, useState } from 'react';

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

const MainPage = () => {
  const [text, setText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalID, setModalID] = useState(0);

  const showModal = (id: number) => {
    setIsModalOpen(true);
    setModalID(id);
  };

  useEffect(() => {
    if (text !== null) {
      localStorage.setItem('data', JSON.stringify(text));
    }
  }, [text]);

  useEffect(() => {
    if (localStorage.getItem('data')) {
      setText(JSON.parse(localStorage.getItem('data') as string));
    }
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
      {isModalOpen && <Modal setModalClosed={() => setIsModalOpen(false)} id={modalID}></Modal>}
    </div>
  );
};

export default MainPage;
