import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Webcam from "react-webcam";
import arrow from "./../assets/arrow.png"

class Analyze extends Component{
  constructor(){
    super();
    this.state = {
      imageBlob: null,
      eyecolor: null,
      skincolor: null,
    }
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imageBlob: imageSrc,
    })
    this.send();
  };
  send = () => {

    const { setColors } = this.props;


    //var input = document.querySelector('input[type="file"]')
    var data = new FormData()
    data.append('file', this.state.imageBlob)

    fetch('/api/detect', {
      method: 'POST',
      body: data
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //history.push('/Suggestions');
      setColors({eyecolor: data.eyecolor, skincolor: data.skincolor});
      this.props.history.push('/Suggestions');
      //console.log(this.state.skincolor[0],this.state.skincolor[1],this.state.skincolor[2]);
    })
  };

  // componentDidMount:
  //  - Lage en variabel som holder nedtellingen
  //  - Lage en setTimeout function som minsker nedtellingen med 1
  //  - Når nedtellingen = 0, ta bilde (kall capture funksjonen)
  //  - Når bildet er tatt, send bruker til Suggestions
  //
  // render:
  //  - Sjekk om nedtellingen == 0
  //    -> Vis "bildet er tatt" tekst
  //  - Hvis nedtellingen > 0
  //    -> Vis nedtellingen og forklaring
  componentDidMount(){
    //timer = 3;
    console.log("starting timer");
    var timeout = setTimeout(this.capture,3000);
  }
  render(){
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "environment"
    };
      return(
        <div>
          <Link to="/">
          <strong>Start Over</strong>
          </Link>
          {this.state.skincolor && this.state.skincolor.length > 0 ? <div className="Circle" style = {{background:`rgb(${this.state.skincolor[2]}, ${this.state.skincolor[1]}, ${this.state.skincolor[0]})`}}>skincolor</div> : null}
          {this.state.eyecolor && this.state.eyecolor.length > 0 ? <div className="Circle" style = {{background:`rgb(${this.state.eyecolor[2]}, ${this.state.eyecolor[1]}, ${this.state.eyecolor[0]})`}}>eyecolor</div> : null}
          <div className="webCam">
            <Webcam style={{
              visibility: "hidden",
              //position: "absolute",
            }}
            audio={false}
            height={720}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
            />
            {/* <img src={this.state.imageBlob} alt="none"></img> */}
            {/* <button onClick={this.capture}>Capture photo</button> */}
            {/* <button onClick={this.send}>Send photo</button> */}
          </div>
          <div className="fadein">
           <div className="Bigtext">Look here</div>
           <img src={arrow} alt="" style={{
             width: "400px",
             position: "absolute",
             top: "1%",
             left: "52%"
           }}></img>
          </div>
        </div>
      )
  }
}

export default withRouter(Analyze);
