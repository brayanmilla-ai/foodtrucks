import React, { Component } from "react";
import Page from "../../Page";
import { Redirect } from "react-router-dom";

import { removeLocalStorage } from "../../../utilities/axios";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pswd: "",
      redirectTo: true,
    };
    removeLocalStorage("user");
    removeLocalStorage("jwt");
    window.location.href = "/";
  }
}
