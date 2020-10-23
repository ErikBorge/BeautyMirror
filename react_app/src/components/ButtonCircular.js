import React, {Component} from 'react'

class ButtonCircular extends Component{
  render(){
    const {icon, text,categoryClickHandler, productClickHandler, activeCategory, activeProducts, id, menuobjects} = this.props;
    const visible = activeCategory===id?'active':'';
      return(
        <span className="ButtonCircularContainer">
            <div className={`Halo ${visible}`}>
              <div className="HaloBlack"></div>
              {
                menuobjects.map((value,key)=>{
                  const visibleProduct = activeProducts[value] ? 'active' : '';
                  var offsetAngle = 360/menuobjects.length;
                  var rotateAngle = offsetAngle * key;

                  let top,left;
                  if (rotateAngle>10 && rotateAngle<170){left = '20px';}
                  else if (rotateAngle>190 && rotateAngle<350){left = '-20px';}
                  else {left = '0';}
                  const styles = {
                    top: '45%',
                    left,
                    transform: `rotate(${rotateAngle}deg) translate3d(0, -110px, 0) rotate(-${rotateAngle}deg)`,
                  }
                  return <div style={styles} key={key} className="haloItemContainer">

                    <div className="haloItem" key={key} onClick={() =>productClickHandler(value)}>
                      <span className="text">{value}</span>
                      <div className={`haloItemBlack ${visibleProduct}`}></div>

                      </div>
                  </div>
                })
              }
            </div>

          <div className="ButtonCircular" onClick={() =>categoryClickHandler(id)}><img src={icon} alt=""></img><b>{text}</b></div>
        </span>
      )

  }
}

export default ButtonCircular;
