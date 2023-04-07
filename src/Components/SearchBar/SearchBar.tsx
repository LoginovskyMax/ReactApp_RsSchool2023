import styles from './SearchBar.module.scss';

interface IProps {
  setText: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  text?: string | null;
  getCardsData: (text?: string | null) => void;
}

export const SearchBar = ({ setText, text, getCardsData }: IProps) => {
  return (
    <div className={styles.main}>
      <input
        type="text"
        onChange={(event) => {
          setText(() => event.target.value);
        }}
        value={text !== null ? text : ''}
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
