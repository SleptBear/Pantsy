import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllProducts from "./components/Products";
import Product from "./components/Products/singleProduct";
import AddProduct from "../src/components/Products/addProduct";
import Cart from "./components/Cart"
import Order from "./components/Order";
import { ThemeProvider } from 'react-hook-theme';

import Footer from "./components/Footer";
import Search from "./components/Search";
// import CreateOrder from "./components/CreateOrder"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <ThemeProvider
    options={{
        theme: 'dark',
        save: true,
    }}
    >
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <AllProducts />
          </Route>
          <Route exact path ='/products/:id' >
            <Product />
          </Route>
          <Route exact path='/new' >
            <AddProduct />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/orders'>
            <Order />
            {/* <CreateOrder /> */}
          </Route>
          {/* <Route exact path='/orders/:id'>
            <CreateOrder />
          </Route> */}
          <Route exact path='/search'>
            <Search />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
      </ThemeProvider>
      <Footer/>
    </>
  );
}

function NotFound() {
  return (
    <div className="root-404-page" style={{textAlign: "center", padding: "100px" }}>
      <h1 className="404-title-notFound">404 Not Found</h1>
      <p className="404-paragraph">Sorry, the page you are looking for doesn't exist.</p>
      <img src="https://media1.giphy.com/media/14uQ3cOFteDaU/giphy.gif"></img>
    </div>
  )
}

export default App;
