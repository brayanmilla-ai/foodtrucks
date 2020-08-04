import React, { Component } from "react";
import Page from "../../../Page";
import { getLocalStorage } from "../../../../utilities/axios";
import { ListGroup } from "react-bootstrap";
import { obtenerProductos } from "./actions";
import { NavLink } from "react-router-dom";

import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
export default class extends Component {
  constructor() {
    super();
    var k = JSON.parse(getLocalStorage("user"));
    k = JSON.parse(k);
    if (k) {
      if (k.roles.includes("restaurante")) {
        this.state = {
          items: [],
          loading: true,
        };
        this.onClickButton = this.onClickButton.bind(this);
      }
    }
  }
  async componentDidMount() {
    if (this.props.auth.isLogged && true) {
      var k = JSON.parse(getLocalStorage("user"));
      k = JSON.parse(k);
      if (k.roles.includes("restaurante")) {
        try {
          let items = await obtenerProductos(window.location.pathname);
          this.setState({ ...this.state, items: items });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  async onClickButton(e) {
    /* const { name, value } = e.target;
    try {
      let estado = await aceptarOrden(value, name);
      this.setState({ redirectTo: true }, () => {});
    } catch (e) {
      alert("Error al aceptar la orden.");
    } */
  }

  render() {
    const ItemsListItem = this.state.items.map((o) => {
      if (o) {
        return (
          <ListGroup key={o._id}>
            <ListGroup.Item>
              {o.nombre} {o.descripcion}
            </ListGroup.Item>
          </ListGroup>
        );
      } else {
        return <h1 key="noOrders56">No hay productos disponibles</h1>;
      }
    });

    return (
      <Page
        showHeader={true}
        showFooter={true}
        title={"Ordenes"}
        auth={this.props.auth}
      >
        {ItemsListItem}
      </Page>
    );
  }
}
