import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

import { MdHome } from "react-icons/md";
import { FaUserPlus, FaAngellist, FaUser } from "react-icons/fa";

export default ({ auth }) => {
  console.log(auth);
  console.log(auth);
  if (auth.isLogged && true) {
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
              <NavLink to="/votes">Votos</NavLink>
            </li>
            <li>
              <NavLink to="/alumnos">Alms</NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    );
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
