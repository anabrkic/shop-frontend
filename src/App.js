import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import { LoginPage } from './pages/LoginPage';
import { Navbar } from './Navbar';
import { RegisterPage } from './pages/RegisterPage';
import { CartPage } from './pages/CartPage';
import { ProductsPage } from './pages/ProductsPage';
import { Footer } from './Footer';
import { SingleProductPage } from './pages/SingleProductPage';
import { OrderPage } from './pages/OrderPage';
import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
      <div>
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route path="/products" component={ProductsPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/product/:id" component={SingleProductPage} />
                <Route path="/order" component={OrderPage} />
                <Route path="/admin" component={AdminPage} />
                <Redirect path="/login" />
            </Switch>
            <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
