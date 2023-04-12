import Loading from '../../Components/Loading/Loading';
import Modal from '../../Components/Modal/Modal';
import { useEffect, useState } from 'react';
import { DetailedCard } from '../../Components/DetailedCard/DetailedCard';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { ResultList } from '../../Components/ResultList/ResultList';
import { useAppSelector } from '../../redux/hooks';
import { useGetCardsQuery } from '../../redux/createdCards';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalID, setModalID] = useState(0);
  const text = useAppSelector((state) => state.search.searchText);
  const [searchText, setSearchText] = useState('');
  const { data, isLoading, isError } = useGetCardsQuery(searchText, {
    refetchOnMountOrArgChange: true,
  });

  const showModal = (id: number) => {
    setIsModalOpen(true);
    setModalID(id);
  };

  const getCardsData = (text?: string) => {
    if (text !== undefined) {
      setSearchText(text);
    }
  };

  useEffect(() => {
    getCardsData(text);
  }, []);

  return (
    <div className="mainPage" data-testid="main">
      <SearchBar getCardsData={getCardsData}></SearchBar>
      <ResultList products={data?.products} showModal={showModal}></ResultList>
      {isModalOpen && (
        <Modal setModalClosed={() => setIsModalOpen(false)}>
          <DetailedCard id={modalID} />
        </Modal>
      )}
      {isLoading && <Loading status={isLoading} />}
      {isError && <p>Some server problems :-(</p>}
    </div>
  );
};

export default MainPage;
