import React, { Component } from "react";
import Page from "../../Page";
import "./home.css";
import { getLocalStorage } from "../../../utilities/axios";
import { ListGroup } from "react-bootstrap";
import { obtenerRestaurantes, obtenerRestaurantesClientes } from "./actions";
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
          restaurantes: [],
          loading: true,
        };
      }
    }
  }

  async componentDidMount() {
    if (this.props.auth.isLogged && true) {
      var k = JSON.parse(getLocalStorage("user"));
      k = JSON.parse(k);
      if (k.roles.includes("restaurante") && getLocalStorage("jwt")) {
        try {
          let restaurantes = await obtenerRestaurantes();
          this.setState({ ...this.state, restaurantes: restaurantes });
        } catch (e) {
          console.log(e);
        }
      }

      if (k.roles.includes("cliente") && getLocalStorage("jwt")) {
        try {
          let restaurantes = await obtenerRestaurantesClientes();
          console.log(restaurantes);
          this.setState({ ...this.state, restaurantes: restaurantes });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  render() {
    if (this.props.auth.isLogged && true) {
      var k = JSON.parse(getLocalStorage("user"));
      k = JSON.parse(k);
      if (k.roles.includes("restaurante")) {
        const RestaurantesListItem = this.state.restaurantes.map((o) => {
          return (
            <ListGroup key={o._id}>
              <ListGroup.Item>
                {o.nombre}{" "}
                <NavLink to={`/${o._id}/items`}>
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
            title={"Landing Page"}
            auth={this.props.auth}
          >
            {RestaurantesListItem}
          </Page>
        );
      } /* else if (k.roles.includes("cliente")) {
        const RestaurantesListItem = this.state.restaurantes.map((o) => {
          return (
            <ListGroup key={o._id}>
              <ListGroup.Item>
                {o.nombre}{" "}
                <NavLink to={`/${o._id}/items`}>
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
            title={"Landing Page"}
            auth={this.props.auth}
          >
            {RestaurantesListItem}
          </Page>
        );
      }  */ else {
        return (
          <Page
            showHeader={true}
            showFooter={true}
            title={"Landing Page"}
            auth={this.props.auth}
          >
            <h2 className="texto">FOOD TRUCKS 0.1</h2>
          </Page>
        );
      }
    } else {
      return (
        <Page
          showHeader={true}
          showFooter={true}
          title={"Landing Page"}
          auth={this.props.auth}
        >
          <img className="img" src="/IMG/FoodTrucks.png" />
          {/* <h2 className="texto">FOOD Login TRUCKS 0.1</h2> */}
        </Page>
      );
    }
  }
}
