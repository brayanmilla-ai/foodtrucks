import React, { Component } from "react";
import Page from "../../Page";
import "./home.css";
import { getMocion, getPrivateMocion } from "./actions";
export default class extends Component {
  constructor() {
    super();
  }
  render() {
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
}
