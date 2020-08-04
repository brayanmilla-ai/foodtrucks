import React, { Component } from "react";
import Page from "../../Page";
import { Redirect } from "react-router-dom";
import "./login.css";
import { login } from "./actions";
import { setLocalStorage, getLocalStorage } from "../../../utilities/axios";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pswd: "",
      redirectTo: false,
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  onTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  async onClickButton(e) {
    try {
      let userData = await login(this.state.email, this.state.pswd);
      const { jwt } = userData;
      delete userData.jwt;
      let data = JSON.stringify(userData);
      this.setState({ redirectTo: true }, () => {
        if (!getLocalStorage("user")) {
          setLocalStorage("user", JSON.stringify(data));
        }
        this.props.auth.login(data, jwt);
      });
    } catch (e) {
      alert("Error al iniciar sesión.");
    }
  }
  render() {
    if (this.state.redirectTo) {
      const tourl = this.props.location.state
        ? this.props.location.state.from.pathname
        : "/";
      return <Redirect to={tourl} />;
    }
    return (
      <Page
        showHeader={true}
        showFooter={true}
        title={"Iniciar Sesión"}
        auth={this.props.auth}
      >
        <div className="loginform">
          <h3 className="text-center">Iniciar Sesión</h3>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              onChange={this.onTextChange}
              className="form-control"
              value={this.state.email}
              placeholder="Ingrese el correo electronico"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="pswd"
              onChange={this.onTextChange}
              value={this.state.pswd}
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={this.onClickButton}
            className="btn btn-primary btn-block"
          >
            Iniciar
          </button>
        </div>
      </Page>
    );
  }
}
