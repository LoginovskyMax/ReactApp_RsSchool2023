import { IProduct } from "../../Pages/responseData"
import Card from "../Card/Card";
import styles from './ResultList.module.scss'

interface IProps {
   products: IProduct[];
   showModal:  (id: number) => void
}

export const ResultList = ({products, showModal}:IProps) => {
  return (
     <div className={styles.main}>
        {products.map((item: IProduct) => (
          <Card key={item.id} data={item} showModal={showModal} />
        ))}
      </div>
  )
}
