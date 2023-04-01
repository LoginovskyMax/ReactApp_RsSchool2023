import { useState } from 'react';
import Card from '../../Components/Card/Card';
import { FormHook } from '../../Components/FormFunctionComp/FormHook';
import { IProduct } from '../MainPage/MainPage';

const AddCard = () => {
  const [cards, setCards] = useState<IProduct[]>([]);

  const addCard = (newCard: IProduct) => {
    const arr = [...cards];
    arr.push(newCard);
    setCards(arr);
  };

  return (
    <div>
      <h2>You can create a new card here</h2>
      <FormHook addCard={addCard} />
      <div className="mainPage__conteiner">
        {cards.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default AddCard;
