import React, {Component} from 'react'

class ProductSuggestion extends Component{
  render(){
    const {productname, productprice, productpicture, suggestiontext} = this.props;
      return(

          <div className="ProductSuggestionContainer">
            <div className="ProductPicture">
              <img src={productpicture} alt="blush" style={{width:'100%'}}></img>
            </div>
            <div className="ProductSuggestionContainerContent">
              <div className="ProductSuggestionContainerContentInner">
                <b>{productname}<br/></b>
                <p>{productprice}<br/></p>
                <div className="BuyButton">Buy</div>
                <p style={{fontSize: "13px", paddingTop: "30px"}}>{suggestiontext}</p>
              </div>
            </div>
          </div>
      )

  }
}

export default ProductSuggestion;
