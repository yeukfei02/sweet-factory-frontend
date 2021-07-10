import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./navBar/NavBar";
import MainView from "./mainView/MainView";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import Zones from "./zones/Zones";
import CreateZone from "./zones/CreateZone";
import ZoneDetails from "./zones/ZoneDetails";
import Cities from "./cities/Cities";
import CreateCity from "./cities/CreateCity";
import CityDetails from "./cities/CityDetails";
import Machines from "./machines/Machines";
import CreateMachine from "./machines/CreateMachine";
import MachineDetails from "./machines/MachineDetails";
import Products from "./products/Products";
import CreateProduct from "./products/CreateProduct";
import ProductDetails from "./products/ProductDetails";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://ccvwi4h6vk.execute-api.ap-southeast-1.amazonaws.com/prod",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // uri: "https://ccvwi4h6vk.execute-api.ap-southeast-1.amazonaws.com/prod",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <MainView />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/zones">
            <Zones />
          </Route>
          <Route exact path="/zones/create-zones">
            <CreateZone />
          </Route>
          <Route exact path="/zones/:id">
            <ZoneDetails />
          </Route>
          <Route exact path="/cities">
            <Cities />
          </Route>
          <Route exact path="/cities/create-cities">
            <CreateCity />
          </Route>
          <Route exact path="/cities/:id">
            <CityDetails />
          </Route>
          <Route exact path="/machines">
            <Machines />
          </Route>
          <Route exact path="/machines/create-machines">
            <CreateMachine />
          </Route>
          <Route exact path="/machines/:id">
            <MachineDetails />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/products/create-products">
            <CreateProduct />
          </Route>
          <Route exact path="/products/:id">
            <ProductDetails />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
