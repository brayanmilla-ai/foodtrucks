import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

import { MdHome } from "react-icons/md";
import { FaUserPlus, FaAngellist, FaUser, FaFirstOrder } from "react-icons/fa";
import { getLocalStorage } from "../../utilities/axios";

export default ({ auth }) => {
  var k = JSON.parse(getLocalStorage("user"));
  k = JSON.parse(k);
  if (k) {
    if (auth.isLogged && true) {
      /*       return (
        <footer>
          <nav>
            <ul>
              <li>
                <NavLink to="/">
                  <MdHome size="2em" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/ordenes">Ordenes</NavLink>
              </li>
              <li>
                <NavLink to="/carrito">Carrito</NavLink>
              </li>
              <li>
                <NavLink to="/pedidos">Pedidos</NavLink>
              </li>
            </ul>
          </nav>
        </footer>
      ); */
      if (k.roles.includes("cliente")) {
        return (
          <footer>
            <nav>
              <ul>
                <li>
                  <NavLink to="/">
                    <MdHome size="2em" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ordenes">Ordenes</NavLink>
                </li>
                <li>
                  <NavLink to="/carrito">Carrito</NavLink>
                </li>
                <li>
                  <NavLink to="/pedidos">Pedidos</NavLink>
                </li>
              </ul>
            </nav>
          </footer>
        );
      }
      if (k.roles.includes("delivery")) {
        return (
          <footer>
            <nav>
              <ul>
                <li>
                  <NavLink to="/">
                    <MdHome size="2em" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ordenes">Pedidos</NavLink>
                </li>
                <li>
                  <NavLink to="/carrito">Aceptados</NavLink>
                </li>
                <li>
                  <NavLink to="/pedidos">Entregados</NavLink>
                </li>
              </ul>
            </nav>
          </footer>
        );
      }
      if (k.roles.includes("restaurante")) {
        return (
          <footer>
            <nav>
              <ul>
                <li>
                  <NavLink to="/">
                    <MdHome size="2em" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ordenes">Productos</NavLink>
                </li>
                <li>
                  <NavLink to="/carrito">Items</NavLink>
                </li>
                <li>
                  <NavLink to="/pedidos">Ordenes</NavLink>
                </li>
              </ul>
            </nav>
          </footer>
        );
      }
    } else {
      return (
        <footer>
          <nav>
            <ul>
              <li>
                <NavLink to="/">
                  <MdHome size="2em" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/signin">
                  <FaUserPlus size="2em" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <FaUser size="2em" />
                </NavLink>
              </li>
            </ul>
          </nav>
        </footer>
      );
    }
  } else {
    return (
      <footer>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <MdHome size="2em" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin">
                <FaUserPlus size="2em" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <FaUser size="2em" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
};
