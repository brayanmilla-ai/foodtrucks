import React, { Component } from "react";
import Page from "../../Page";
import { getLocalStorage } from "../../../utilities/axios";
import { ListGroup } from "react-bootstrap";
import { obtenerOrdenes } from "./actions";
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
      }
    }
  }
  async componentDidMount() {
    try {
      let ordenes = await obtenerOrdenes();
      this.setState({ ...this.state, ordenes: ordenes });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const OrdenesListItem = this.state.ordenes.map((o) => {
      return (
        <ListGroup key={o._id}>
          <ListGroup.Item>
            {o.nombre}{" "}
            <NavLink to={`/productos/${o._id}`}>
              <FaInfoCircle size="35px" />
            </NavLink>
          </ListGroup.Item>
        </ListGroup>
      );
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
