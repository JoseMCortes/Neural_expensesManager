import React from "react";
import { Container } from "semantic-ui-react";

import Head from "next/head";
import Header from "./Header";

export default props => {
  // Children system, it includes semantic-ui styles to improve the look and feel of the form items
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
