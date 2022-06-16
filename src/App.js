import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.scss';
import Header from './layout/header/header';
import Cart from './pages/cart/cart';
import DropCart from "./components/dropCart/dropCart"
import CurrencyDropDown from "./components/currencyDropDown/currencyDropDown"
import { QueryProduct, QueryProductDetails } from "./queryHOC/query";
import { changeSelectedCurrency } from './redux/actions/selectedCurrency'
import { connect } from 'react-redux';
import MainContent from "./layout/mainContent/mainContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      selectedCurrency: '',
      categoryArray: [],
      cartDropDown: false,
      currencyDropDown: false
    }
  }

  componentDidMount() {
    this.props.changeSelectedCurrency(this.props.data.currencies[0].symbol)
    this.setState(() => {
      return {
        selectedCategory: this.props.data.categories[0].name,
      }
    })
  }

  changeCategory = (selected) => {
    this.setState(() => {
      return { selectedCategory: selected }
    })
  }

  showCart = () => {
    this.setState((prevState) => {
      return { cartDropDown: !prevState.cartDropDown, currencyDropDown: false }
    })
  }

  showCurrency = () => {
    this.setState((prevState) => {
      return { currencyDropDown: !prevState.currencyDropDown, cartDropDown: false }
    })
  }

  selectCurrency = () => {
    this.setState((prevState) => {
      return { currencyDropDown: !prevState.currencyDropDown }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header categories={this.props.data.categories}
            changeCategory={this.changeCategory}
            showCurrency={this.showCurrency} showCart={this.showCart} />
          {this.state.currencyDropDown ?
            <CurrencyDropDown currencies={this.props.data.currencies} selectCurrency={this.selectCurrency} />
            : null
          }
          {this.state.cartDropDown ?
            <DropCart showCart={this.showCart} />
            : null
          }
          <MainContent>
            <Routes>
              <Route exact path='/' element={< QueryProduct />}></Route>
              <Route path='/:name' element={< QueryProduct />}></Route>
              <Route exact path='/product_details' element={< QueryProductDetails />}></Route>
              <Route exact path='/cart' element={< Cart />}></Route>
            </Routes>
          </MainContent>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  selectedCurrency: state.selectedCurrency,
});

export default connect(
  mapStateToProps, { changeSelectedCurrency }
)(App);
