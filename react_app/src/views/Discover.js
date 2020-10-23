import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ButtonCircular from './../components/ButtonCircular'
import eyesicon from './../assets/icons/icons/eyes@3x.png'
import baseicon from './../assets/icons/icons/base@3x.png'
import lipsicon from './../assets/icons/icons/lips@3x.png'

class Discover extends Component{
  // constructor(){
  //   super();
  //   this.state={
  //     activeCategory: false,
  //     activeProducts: {},
  //   }
  // }
  // onCategoryClick=(id)=>{
  //   console.log(id);
  //   const activeCategory = id!==this.state.activeCategory?id:'';
  //   this.setState({activeCategory})
  // }
  // onProductClick=(id)=>{
  //   console.log(id);
  //   const activeProducts = Object.assign({}, this.state.activeProducts);
  //
  //   if(activeProducts[id]) {
  //     delete activeProducts[id];
  //   } else {
  //     activeProducts[id] = id;
  //   }
  //
  //   this.setState({activeProducts})
  // }
  render(){
    const {activeCategory, activeProducts, onProductClick, onCategoryClick} = this.props;

    if(!activeProducts) {
      return null;
    }

      return(
        <div>
          <div className="StartOver">
            <Link to="/">
              <strong>Start Over</strong>
            </Link>
          </div>
          <div className="Bigtext">What are you looking for?</div>
          <div className="Middle">
            <ButtonCircular icon = {eyesicon} activeProducts = {activeProducts} activeCategory = {activeCategory} productClickHandler={(id)=>onProductClick(id)} categoryClickHandler={(id)=>onCategoryClick(id)} id="Eyes" text={"Eyes"} menuobjects={["EYESHADOW", "EYELINER", "MASCARA", "BROW", "EYE PENCIL","LASHES"]}/>
            <ButtonCircular icon = {baseicon} activeProducts = {activeProducts} activeCategory = {activeCategory} productClickHandler={(id)=>onProductClick(id)} categoryClickHandler={(id)=>onCategoryClick(id)} id="Base" text={"Base"} menuobjects={["FOUNDATION","CONCEALER","POWDER","BLUSH","CONTOURING","HIGHLIGHT","PRIMER"]}/>
            <ButtonCircular icon = {lipsicon} activeProducts = {activeProducts} activeCategory = {activeCategory} productClickHandler={(id)=>onProductClick(id)} categoryClickHandler={(id)=>onCategoryClick(id)} id="Lips" text={"Lips"} menuobjects={[]}/>
          </div>
          <div className="Lower">
            <Link to="/Analyze">
              <div className="ButtonRectangular">NEXT</div>
            </Link>
          </div>

        </div>
      )
  }
}

export default Discover;
