import React, { Component } from "react";
import Page from "../../Page";
import { getLocalStorage } from "../../../utilities/axios";
import { ListGroup } from "react-bootstrap";
import { obtenerOrdenes, aceptarOrden } from "./actions";
import { NavLink } from "react-router-dom";

import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { getMocion, getPrivateMocion } from "./actions";
export default class extends Component {
  constructor() {
    super();
    var k = JSON.parse(getLocalStorage("user"));
    k = JSON.parse(k);
    if (k) {
      if (k.roles.includes("restaurante")) {
        this.state = {
          ordenes: [],
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
          let ordenes = await obtenerOrdenes();
          this.setState({ ...this.state, ordenes: ordenes });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  async onClickButton(e) {
    const { name, value } = e.target;
    try {
      let estado = await aceptarOrden(value, name);
      this.setState({ redirectTo: true }, () => {});
    } catch (e) {
      alert("Error al aceptar la orden.");
    }
  }

  render() {
    const OrdenesListItem = this.state.ordenes.map((o) => {
      if (o.estado == 1) {
        return (
          <ListGroup key={o._id}>
            <ListGroup.Item>
              {o._id}{" "}
              {/*  <NavLink to={`/productos/${o._id}`}>
              <FaInfoCircle size="35px" />
            </NavLink> */}
              <button
                className="btn btn-success"
                value={o._id}
                name="1"
                onClick={this.onClickButton}
              >
                Aceptar
              </button>
              <button
                className="btn btn-danger"
                value={o._id}
                name="ordenId"
                onClick={this.onClickButton}
              >
                Cancelar
              </button>
            </ListGroup.Item>
          </ListGroup>
        );
      } else if (o.estado == 2) {
        return (
          <ListGroup key={o._id}>
            <ListGroup.Item>
              {o._id}{" "}
              <button
                className="btn btn-success"
                value={o._id}
                name="2"
                onClick={this.onClickButton}
              >
                Marcar Orden Lista
              </button>
            </ListGroup.Item>
          </ListGroup>
        );
      } else {
        return <h1 key="noOrders56">No hay ordenes disponibles</h1>;
      }
    });

    return (
      <Page
        showHeader={true}
        showFooter={true}
        title={"Ordenes"}
        auth={this.props.auth}
      >
        {OrdenesListItem}
      </Page>
    );
  }
}
