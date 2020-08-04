import React, { Component } from "react";
import Page from "../../Page";
import { register } from "./actions";
import { NavLink } from "react-router-dom";
import "./singnin.css";
import { Form } from "react-bootstrap";
export default class extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      tipo: "",
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }
  onTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onRadioChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async onClickButton(e) {
    try {
      if (this.state.email != "" || this.state.password != "") {
        let userData = await register(
          this.state.email,
          this.state.password,
          this.state.tipo
        );
        if (userData.status == 204) {
          alert("El correo electronico ya esta en uso");
        } else if (userData.status == 201) {
          alert(userData.data.msg);
          window.location.href = "/login";
        }
      } else {
        alert("No se permite campos vacios");
      }
    } catch (e) {
      alert("Error al crear el usuario.\n" + e);
    }
  }
  render() {
    return (
      <Page
        showHeader={true}
        showFooter={true}
        title={"Registrarse"}
        auth={this.props.auth}
      >
        <div className="signInform">
          <h3>Registrarse</h3>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              name="email"
              onChange={this.onTextChange}
              value={this.state.email}
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={this.onTextChange}
              value={this.state.password}
              placeholder="Enter password"
            />
          </div>
          <div className="p-10">
            <Form.Check
              type="radio"
              name="tipo"
              onClick={this.onRadioChange}
              value="restaurante"
              id="restaurante"
              label="Soy Dueño de restaurante"
            />
            <Form.Check
              type="radio"
              name="tipo"
              value="repartidor"
              onClick={this.onRadioChange}
              id="repartidor"
              label="Soy Repartidor"
            />
          </div>
          <button
            onClick={this.onClickButton}
            className="btn btn-primary btn-block"
          >
            Crear
          </button>
        </div>
      </Page>
    );
  }
}
