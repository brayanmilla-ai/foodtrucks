import React from "react";
import Header from "../Header";
import Footer from "../Footer";

export default ({ showHeader, showFooter, title, children, auth }) => {
  const myHeader = showHeader ? (
    <Header title={title} auth={auth}></Header>
  ) : null;
  const myFooter = showFooter ? <Footer auth={auth}></Footer> : null;
  return (
    <section>
      {myHeader}
      <main>{children}</main>
      {myFooter}
    </section>
  );
};
