import Card from '../../Components/Card/Card';
import Loading from '../../Components/Loading/Loading';
import Modal from '../../Components/Modal/Modal';
import { useEffect, useRef, useState } from 'react';
import { IProduct, IResponse } from '../responseData';
import { DetailedCard } from '../../Components/DetailedCard/DetailedCard';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { ResultList } from '../../Components/ResultList/ResultList';

const HOST = 'https://dummyjson.com/products';

const MainPage = () => {
  const [text, setText] = useState<string | null | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [modalID, setModalID] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [errorResponse, setErrorResponse] = useState(false);

  const showModal = (id: number) => {
    setIsModalOpen(true);
    setModalID(id);
  };

  const getCardsData = (text?: string | null) => {
    let url = HOST;
    if (text) {
      url = `${HOST}/search?q=${text.toLowerCase()}`;
    }
    setIsLoad(true);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then<IResponse>((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
        setIsLoad(false);
      })
      .catch((error) => {
        setErrorResponse(true);
        console.log(error);
      });
  };

  useEffect(() => {
    return ()=>{
      if (text !== null && text !== undefined) {
        localStorage.setItem('data', JSON.stringify(text));
      }
    }
  });

  useEffect(()=>{
    if (errorResponse) {
      setIsLoad(false);
    }
  },[errorResponse])

  useEffect(() => {
    if (localStorage.getItem('data')) {
      const lsText = JSON.parse(localStorage.getItem('data') as string);
      setText(lsText);
      getCardsData(lsText);
    }
  }, []);

  return (
    <div className="mainPage" data-testid="main">
      <SearchBar setText={setText} text={text} getCardsData={getCardsData}></SearchBar>
      <ResultList products={products} showModal={showModal}></ResultList>
      {isModalOpen && (
        <Modal setModalClosed={() => setIsModalOpen(false)}>
          <DetailedCard id={modalID} />
        </Modal>
      )}
      {isLoad && <Loading status={isLoad} />}
      {errorResponse && <p>Some server problems :-(</p>}
    </div>
  );
};

export default MainPage;
