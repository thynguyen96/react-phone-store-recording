import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/Navbar';
import Store from './components/Store';
import ProductList from './components/ProductList';
import Default from './components/Default';
import Cart from './components/Cart/Cart';
import Details from './components/Details';
import Modal from './components/Modal'

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ProductList} />
                    <Route exact path="/details" component={Details} />
                    <Route exact path="/cart" component={Cart} />
                    <Route component={Default} />
                </Switch>
                <Modal />
            </React.Fragment>
        );
    }
}

export default App;
