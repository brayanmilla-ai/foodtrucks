import React, { Component } from "react";
import Page from "../../Page";
import { register } from "./actions";
export default class extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      if (this.state.email != "" || this.state.password != "") {
        let userData = await register(this.state.email, this.state.password);
      } else {
        alert("No se permite campos vacios");
      }
      this.setState({ redirectTo: true }, () => {});
    } catch (e) {
      alert("Error al crear el usuario.");
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
        <h2></h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum illo
          accusamus, similique sequi saepe cum quas labore, fugit repellat
          assumenda delectus in suscipit harum quisquam accusantium impedit ipsa
          ut. Dignissimos.
        </p>
        <fieldset>
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            onChange={this.onTextChange}
            value={this.state.email}
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={this.onTextChange}
            value={this.state.password}
          />
        </fieldset>
        <button onClick={this.onClickButton}>Sign In</button>
        {this.state.email}
        <br />
        {this.state.password}
      </Page>
    );
  }
}
