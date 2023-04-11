import Card from '../../Components/Card/Card';
import { FormHook } from '../../Components/FormFunctionComp/FormHook';
import { useAppSelector } from '../../redux/hooks';
import styles from './AddCard.module.scss'

const AddCard = () => {
  const cards = useAppSelector(state=>state.createCards.createdCards)
 
  return (
    <div>
      <h2>You can create a new card here</h2>
      <FormHook/>
      <div className={styles.conteiner}>
        {cards.map((data) => (
          <Card data={data} key={data.id} showModal={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default AddCard;
