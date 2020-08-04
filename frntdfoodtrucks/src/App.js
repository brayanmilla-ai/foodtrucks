import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import PRoute from "./utilities/privateroutes";
import NRoute from "./utilities/normalroutes";

import {
  setJWT,
  getLocalStorage,
  setLocalStorage,
  setUnAuthInterceptor,
} from "./utilities/axios";

import "./App.css";

import Home from "./Components/Content/Home";
import Login from "./Components/Content/LogIn";
import LogOut from "./Components/Content/LogOut";
import SignIn from "./Components/Content/SignIn";
import Delivery from "./Components/Content/Delivery";
import Cliente from "./Components/Content/Cliente";
import Repartidor from "./Components/Content/Repartidor";
import carrito from "./Components/Content/Cliente/carrito";
import ordenes from "./Components/Content/Restaurante";
import pedido from "./Components/Content/Cliente/pedidos";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      user: getLocalStorage("user") || {},
      jwt: getLocalStorage("jwt") || "",
      isLogged: false,
      loadingBackend: false,
    };
    if (this.state.jwt !== "") {
      setJWT(this.state.jwt);
      this.state.isLogged = true;
    }
    this.setLogginData = this.setLogginData.bind(this);
    this.setLoggoutData = this.setLoggoutData.bind(this);

    setUnAuthInterceptor(this.setLoggoutData);
  }

  componentDidMount() {
    this.setState({ loadingBackend: true });
  }
  setLogginData(user, jwt) {
    user = JSON.stringify(user);
    console.log(user);
    this.setState(
      {
        ...this.state,
        user: user,
        jwt: jwt,
        isLogged: true,
      },
      () => {
        setLocalStorage("jwt", jwt);
        setLocalStorage("user", user);
        setJWT(jwt);
      }
    );
  }
  setLoggoutData() {
    if (this.state.loadingBackend) {
      this.setState(
        {
          ...this.state,
          user: "",
          jwt: "",
          isLogged: false,
        },
        () => {
          setJWT("");
        }
      );
    } else {
      this.state = {
        ...this.state,
        user: "",
        jwt: "",
        isLogged: false,
      };
      setJWT("");
    }
  }
  render() {
    if (!this.state.loadingBackend) {
      return <div className="splash"> ...Loading </div>;
    }
    const auth = {
      isLogged: this.state.isLogged,
      login: this.setLogginData,
      logout: this.setLoggoutData,
    };
    return (
      <Router>
        <Switch>
          <NRoute path="/" component={Home} exact auth={auth} />
          <NRoute path="/login" component={Login} exact auth={auth} />
          <NRoute path="/logout" component={LogOut} exact auth={auth} />
          <NRoute path="/signin" component={SignIn} exact auth={auth} />
          <PRoute path="/delivery" component={Delivery} exact auth={auth} />
          <PRoute path="/cliente" component={Cliente} exact auth={auth} />
          <PRoute path="/carrito" component={carrito} exact auth={auth} />
          <PRoute path="/pedidos" component={pedido} exact auth={auth} />
          <PRoute path="/ordenes" component={ordenes} exact auth={auth} />
          <PRoute path="/repartidor" component={Repartidor} exact auth={auth} />
        </Switch>
      </Router>
    );
  }
}
