import { Component } from 'react'
import styles from './FileInput.module.scss'
import svg from '../../assets/download.png'

interface IProps {
    image:React.RefObject<HTMLInputElement>,
    deleteError:()=>void
}

interface IState{
     showImg:boolean
}

export default class FileInput extends Component<IProps,IState> {
    path = ''
    constructor(props:IProps){
        super(props)
        this.state = {showImg:false}
    }
    setImg = () => {
        if(this.props.image.current !== null && this.props.image.current.files !==null){
            this.path = URL.createObjectURL(this.props.image.current.files[0])
           }
        this.props.deleteError()
        this.setState({showImg:true})
    }
  render() {
    return (
    <div className={styles.input__wrapper}>
        <input name="file" 
               type="file" 
               id="input__file" 
               className={styles.input__file} 
               ref={this.props.image} 
               accept="image/*" 
               onInput={this.setImg}/>
        <label htmlFor='input__file' className={styles.input__file_button}>
           <span className={styles['input__file-icon-wrapper']}>
            <img className={styles["input__file-icon"]} src={svg} alt="img" width="35"/>
           </span>
           <span className={styles["input__file-button-text"]}>Choose image</span>
           {this.state.showImg &&  <img className={styles["input__file-load-img"]} src={this.path} alt="img" height="58"/>}
         
        </label>
    </div>
    )
  }
}
