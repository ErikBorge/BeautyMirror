import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Discover from './views/Discover'
import Analyze from './views/Analyze'
import Suggestions from './views/Suggestions'

class App extends Component {

  constructor(){
    super();
    this.state = {
      activeCategory: '',
      activeProducts: {},
    }
  }

  onProductClick = (id) => {
    console.log(id);
    const activeProducts = Object.assign({}, this.state.activeProducts);

    if(activeProducts[id]) {
      delete activeProducts[id];
    } else {
      activeProducts[id] = id;
    }

    this.setState({activeProducts})
  }

  onCategoryClick = (id) => {
    console.log(id);
    const activeCategory = id!==this.state.activeCategory?id:'';
    this.setState({activeCategory})
  }

  setColors = (colors) => {
    this.setState({colors});
    console.log(colors);
    // set state til de 2 colors
  }

  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/Discover" render={(props) => <Discover {...props} onCategoryClick={this.onCategoryClick} onProductClick={this.onProductClick} activeProducts={this.state.activeProducts} activeCategory={this.state.activeCategory}  />} />
        <Route exact path="/Analyze" render={(props) => <Analyze {...props} setColors={this.setColors} />} />

        <Route exact path="/Suggestions" render={(props) => <Suggestions {...props} colors={this.state.colors} activeProducts={this.state.activeProducts}/>} />
      </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <div className="Bigtext">Makeup your Mind</div>
      <div className="Middle">
        <p>
          <b>Embrace the adventure</b><br/>before it embraces<br/>you...
        </p>
      </div>
      <div className="Lower">
        <Link to="/Discover">
          <div className="ButtonRectangular">DISCOVER</div>
        </Link>
      </div>
    </div>
  );
}

export default App;
