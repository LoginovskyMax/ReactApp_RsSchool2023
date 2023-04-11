import styles from './SearchBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setText } from '../../redux/searchs';

interface IProps {
  getCardsData: (text?: string | null) => void;
}

export const SearchBar = ({getCardsData }: IProps) => {
  let text = useAppSelector(state=>state.search.searchText)
  const dispatch = useAppDispatch();

  const handleKey = (key: string) => {
    if (key === 'Enter') {
      getCardsData(text);
    }
  };
  return (
    <div className={styles.main}>
      <input
        type="text"
        onChange={(event) => {
          dispatch(setText(event.target.value));
        }}
        onKeyDown={(e) => handleKey(e.key)}
        value={text !== null && text !== undefined ? text : ''}
        placeholder="Search..."
        className={styles.main__input}
        data-testid="main-input"
      />
      <button className="main__btn" onClick={() => getCardsData(text)}>
        Search
      </button>
    </div>
  );
};
