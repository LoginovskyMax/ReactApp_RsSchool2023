import Loading from '../../Components/Loading/Loading';
import Modal from '../../Components/Modal/Modal';
import { useEffect, useState } from 'react';
import { IProduct, IResponse } from '../responseData';
import { DetailedCard } from '../../Components/DetailedCard/DetailedCard';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { ResultList } from '../../Components/ResultList/ResultList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const HOST = 'https://dummyjson.com/products';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [modalID, setModalID] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [errorResponse, setErrorResponse] = useState(false);
  let text = useAppSelector(state=>state.search.searchText)

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
        setProducts(data.products);
        setIsLoad(false);
      })
      .catch((error) => {
        setErrorResponse(true);
        console.log(error);
        setIsLoad(false);
      });
  };


  useEffect(() => {
    getCardsData(text);
  }, []);

  return (
    <div className="mainPage" data-testid="main">
      <SearchBar getCardsData={getCardsData}></SearchBar>
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
