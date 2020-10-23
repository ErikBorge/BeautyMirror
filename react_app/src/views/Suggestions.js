import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductSuggestion from './../components/ProductSuggestion'
import blushcarmel from './../assets/blushcarmel.jpg';
import blushpeach from './../assets/blushpeach.jpg';
import blushsand from './../assets/blushsand.jpg';
import carticon from './../assets/icons/icons/Basket@3x.png'
import helpicon from './../assets/icons/icons/Help@3x.png'
import crossicon from './../assets/icons/icons/CROSS White@3x.png'

class Suggestions extends Component{
  constructor(){
    super();
    this.state = {tweenstarted: ""};
  }
  componentDidMount = () => {
    setTimeout(()=> {
      this.setState({tweenstarted:"first"});
    },500)
  }

  render(){
    const {tweenstarted}=this.state;
    const eyecolor = this.props.colors.eyecolor;
    const skincolor = this.props.colors.skincolor;
    const activeproducts = this.props.activeProducts;
    // console.log("activeproducts");
    // console.log(activeproducts);
    //var activeproducts = {EYELINER: "EYELINERRR",MASCARA: "MASCARRRA"};
    var res = Object.keys(activeproducts);
    console.log("res");
    console.log(res);
    // const eyecolor = [150, 50, 50];
    // const skincolor = [0, 100, 100];
    var success = true;
    if (eyecolor[0] === 0 && eyecolor[1] === 0 && eyecolor[2] === 0){
      success = false;
    }
    else {
      success = true;
    }
      return(
        <div className="fadein">
          <Link to="/">
          <strong>Start Over</strong>
          </Link>
          <div className="sideleft">
            <div className="sideitem">
              {eyecolor && eyecolor.length > 0 ? <div className="sidecolorbox" style = {{background:`rgb(${eyecolor[2]}, ${eyecolor[1]}, ${eyecolor[0]})`}}></div> : null}
              {success === false ? <b>No eye color, try again</b> : <b>Eye color</b>}
            </div>
            <div className="sideitem">
              {skincolor && skincolor.length > 0 ? <div className="sidecolorbox" style = {{background:`rgb(${skincolor[2]}, ${skincolor[1]}, ${skincolor[0]})`}}></div> : null}
              {success === false ? <b>No skin color, try again</b> : <b>Skin color</b>}
            </div>
          </div>
          <div className="sideright">
            <div className="sideitem">
              <div className="ButtonCircular"><img src={carticon} alt="cart"></img></div>
              <b>Cart</b>
            </div>
            <div className="sideitem">
              <div className="ButtonCircular"><img src={helpicon} alt="help"></img></div>
              <b>Ask seller</b>
            </div>
          </div>
          <div className="Bigtext">Personalized Makeup</div>
          <div className="Middle" style={{top:'72%'}}>
            {
              res.map((value)=>{
                //console.log(value);
                return <div className="SuggestionCategory"><b>{value}</b>
                    <img src={crossicon} alt="" style={{height:'50%'}}></img>
                  </div>
              })
            }
          </div>
          <div className="ProductSuggestionArea">
            <div className="ProductSuggestionOuterContainer">
              <div className={`ProductSuggestionInnerContainer ${tweenstarted}`}>
                <ProductSuggestion productname = "Blush Carmel" productprice = "132 kr" productpicture={blushcarmel} suggestiontext = "Based on your skin and eye color"/>
                <ProductSuggestion productname = "Blush Peach" productprice = "132 kr" productpicture={blushpeach} suggestiontext = "Based on your skin color"/>
                <ProductSuggestion productname = "Blush Sand" productprice = "132 kr" productpicture={blushsand} suggestiontext = "Based on your eye color"/>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Suggestions;
