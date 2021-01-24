import React, {useEffect, useState} from 'react';
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
import { CongratulatePage } from './pages/CongratulatePage';
import { AccountPage } from './pages/AccountPage';
import {OrdersPage} from "./pages/OrdersPage";

function App() {
  const [role, setRole] = useState(undefined);
  const [id, setId] = useState(undefined);

  useEffect(() => {
      const id = localStorage.getItem('userId');
      const role = localStorage.getItem('role');
      setRole(role);
      setId(id);
  }, []);

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
                {!id && <Redirect path="/login" />}
                <Route path="/admin" component={AdminPage} />
                <Route path="/congratulate" component={CongratulatePage} />
                <Route path="/account/:id" component={AccountPage} />
                <Route path="/order" component={OrderPage} />
                <Route path="/orders/:id" component={OrdersPage} />
                <Redirect path="/login" />
            </Switch>
            <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
