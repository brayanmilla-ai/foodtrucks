import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default (props) => {
  if (props.auth.isLogged && true) {
    return (
      <header>
        <div className="col-0">
          <h1>{props.title}</h1>
        </div>
        <div className="col-1">
          <NavLink className="btn btn-salir" to="/logout">
            Salir
          </NavLink>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <h1>{props.title}</h1>
      </header>
    );
  }
};
