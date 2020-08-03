import React from "react";
import "./Header.css";
export default (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};
