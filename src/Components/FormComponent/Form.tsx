import React, { Component } from 'react'
import styles from './Form.module.scss'
import Card from '../Card/Card'
import { IProduct } from '../../Pages/MainPage/MainPage'
import Alert from '../Alert/Alert'
import FileInput from '../FileInput/FileInput'

const categoryes = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration',
 'furniture', 'womens-dresses']
const stocks = [10,50,100]

interface IState {
    errors: boolean[],
    cardData:IProduct[],
    showModal:boolean
}

export default class Form extends Component<object, IState> {
   
    title = React.createRef<HTMLInputElement>()
    brand = React.createRef<HTMLInputElement>()
    date = React.createRef<HTMLInputElement>()
    image = React.createRef<HTMLInputElement>()
    price = React.createRef<HTMLInputElement>()
    discount = React.createRef<HTMLInputElement>()
    description = React.createRef<HTMLTextAreaElement>()
    category = React.createRef<HTMLSelectElement>()
    stock = React.createRef<HTMLFieldSetElement>()
    form = React.createRef<HTMLFormElement>()

    constructor(props:object){
        super(props)
        this.state = {
          errors:[false,false,false,false,false],
          cardData:[],
          showModal:false}
    }
    

    handleSubmit(e:React.FormEvent){
      this.getStockValue()
       e.preventDefault()
       
       if(this.brand.current !== null){
        if(this.brand.current.value === ""){this.errorMaker(0)}}

       if(this.description.current !== null){
        if(this.description.current.value === ""){this.errorMaker(1)}
       }

       if(this.category.current !== null){
        if(this.category.current.value === "0"){this.errorMaker(2)}
       }

       if(this.price.current !== null){
        if(this.price.current.value === ''){this.errorMaker(3)}
       }

       if(this.image.current !== null && this.image.current.files !==null){
        if(this.image.current.files[0] === undefined){this.errorMaker(4)}
       }

       if(this.date.current !== null){
        if(this.date.current.value === ''){this.errorMaker(5)}
       }

       if(this.title.current !== null){
        if(this.title.current.value === ""){this.errorMaker(6)}}

       if(this.state.errors.every(err=>!err)){
          this.submitForm()
       }
    }
 
    errorMaker(position:number){
        let arr = this.state.errors
        arr.splice(position,1,true)
        this.setState({errors:arr})
    }

    deleteError(position:number){
      let arr = this.state.errors
      arr.splice(position,1,false)
      this.setState({errors:arr})
    }

    submitForm(){
      let imgSrc = ''
      let imgsArr:string[]=[]
      if(this.image.current !== null && this.image.current.files !==null){
        imgSrc = URL.createObjectURL(this.image.current.files[0])
        imgsArr.push(imgSrc)
       }

      let newDiscount = 0
      if(this.discount.current !== null){
        if(this.discount.current.checked)newDiscount=15
       }
      if(this.brand.current!==null &&
        this.description.current!==null &&
        this.price.current!==null &&
        this.title.current!==null && 
        this.category.current !== null){
          let newCard = {
            id: Date.now(),
            brand:this.brand.current.value,
            description:this.description.current.value,
            price: parseFloat(this.price.current.value),
            rating:5,
            stock:this.getStockValue() as number, 
            thumbnail:imgSrc,
            title:this.title.current.value,
            discountPercentage:newDiscount,
            images:imgsArr,
            category:this.category.current.value
        }
        let newArr = this.state.cardData
        newArr.push(newCard)
        this.setState({cardData:newArr, showModal:true}) 
        setTimeout(()=>{
          this.setState({showModal:false}) 
        },2000)
        this.form.current?.reset()
        }

    }

    getStockValue(){
      if(this.stock.current !== null){
        let arr = [...this.stock.current.children]
        let inpArr =  arr.map(child=>child.lastChild as HTMLInputElement) 
        let val = inpArr.find(inp => inp.checked === true) 
        if(val)return parseFloat(val.value)
       }
    }

    createRefs(){

    }

  render() {
    return (
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={(e)=>this.handleSubmit(e)} ref={this.form}>
          <p className={styles.form__title}>Title</p>
          <input type="text" placeholder='Add title...' ref={this.title} onInput={()=>this.deleteError(6)}/>
          <Alert text='Add title' show={this.state.errors[6]}/>
      
          <p className={styles.form__title}>Brand</p>
          <input type="text" placeholder='Add brand...' ref={this.brand} onInput={()=>this.deleteError(0)}/>
          <Alert text='Add brand!' show={this.state.errors[0]}/>

          <p className={styles.form__title}>Description</p>
          <textarea placeholder='Add your description...' ref={this.description} onInput={()=>this.deleteError(1)}></textarea>
          <Alert text='Add description!' show={this.state.errors[1]}/>

          <select ref={this.category} onInput={()=>this.deleteError(2)}>
            <option value="0" key='0'>Choose category</option>
            {categoryes.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
           <Alert text='Add category!' show={this.state.errors[2]}/>

          <p className={styles.form__title}>Price</p>
          <input type="number" placeholder='Add price' ref={this.price} onInput={()=>this.deleteError(3)}/>
          <Alert text='Add price!' show={this.state.errors[3]}/>

           <label className={styles.form__title}>
              Add discount
              <input type="checkbox" ref={this.discount}/>
           </label>

           <p className={styles.form__title}>Upload foto</p>
           <FileInput image={this.image} deleteError={()=>this.deleteError(4)}/>
           <Alert text='Add image!' show={this.state.errors[4]}/>

            <p className={styles.form__title}>Stock</p>
            <fieldset ref={this.stock}>
                {stocks.map(val=> <label  key={val}>
                {val}
                <input type="radio" name='stock' value={val} defaultChecked = {val===10} />
            </label>)}
            </fieldset>
           
            <p className={styles.form__title}>Production date</p>
            <input type="date" ref={this.date} onInput={()=>this.deleteError(5)}/>
            <Alert text='Add date!' show={this.state.errors[5]}/>
            <button type='submit' >Create</button>
        </form>

        <div className="mainPage__conteiner">
           {this.state.cardData.map(data=><Card data={data} key={data.id}/>)}
        </div>

        {this.state.showModal && <div  className={styles.form__succes}>Succes!</div>}
       
      </div>
    )
  }
}
