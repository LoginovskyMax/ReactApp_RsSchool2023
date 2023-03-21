import React, { Component } from 'react'
import styles from './Form.module.scss'

const categoryes = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration',
 'furniture', 'womens-dresses']
const stocks = [10,50,100]

interface IState {
    errors: boolean[]
}

export default class Form extends Component<object, IState> {
    brand = React.createRef<HTMLInputElement>()
    description = React.createRef<HTMLTextAreaElement>()
    category = React.createRef<HTMLSelectElement>()
    price = React.createRef<HTMLInputElement>()
    discount = React.createRef<HTMLInputElement>()
    stock = React.createRef<HTMLFieldSetElement>()
    date = React.createRef<HTMLInputElement>()
    image = React.createRef<HTMLInputElement>()
    constructor(props:object){
        super(props)
        this.state = {errors:[false,false,false,false,false]}
    }
    

    handleSubmit(e:React.FormEvent){
       e.preventDefault()
       if(this.brand.current !== null){
        if(this.brand.current.value === ""){this.errorMaker(0)}
       }

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

       if(this.state.errors.every(err=>!err)){
        console.log("right form");
       }
    }
 
    errorMaker(position:number){
        let arr = this.state.errors
        arr.splice(position,1,true)
        this.setState({errors:arr})
    }

  render() {
    return (
      <div>
        <form className={styles.form} onSubmit={(e)=>this.handleSubmit(e)}>
          <p>Brand</p>
          <input type="text" placeholder='Add brand...' ref={this.brand}/>
          {this.state.errors[0] && <p>Add brand</p>}
          <p>Description</p>
          <textarea placeholder='Add your description...' ref={this.description}></textarea>
          {this.state.errors[1] && <p>Add description</p>}
          <select ref={this.category}>
            <option value="0" key='0'>Choose category</option>
            {categoryes.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {this.state.errors[2] && <p>Add category</p>}
          <p >Price</p>
          <input type="number" placeholder='Add price' ref={this.price}/>
          {this.state.errors[3] && <p>Add price</p>}
           <label >
              Add discount
              <input type="checkbox" ref={this.discount}/>
           </label>

           <p>Upload foto</p>
           <input type="file" ref={this.image} />
           {this.state.errors[4] && <p>Add image</p>}
            <p>Stock</p>
            <fieldset ref={this.stock}>
                {stocks.map(val=> <label  key={val}>
                {val}
                <input type="radio" name='stock' value={val} defaultChecked = {val===10} />
            </label>)}
            </fieldset>
           
            <p>Production date</p>
            <input type="date" ref={this.date}/>
            {this.state.errors[5] && <p>Add date</p>}
            <button type='submit' >Create</button>
        </form>
      </div>
    )
  }
}
