import React from "react";
import "@digdir/designsystemet-theme";
import "@digdir/designsystemet-css";
import { Card, Heading, Paragraph } from "@digdir/designsystemet-react";
import { Link } from "react-router-dom";

import suitcase from "/logo/suitcase.jpg";
import smartpackSketch from "/logo/smartpack-sketch.jpg";

const Index = () => {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--fds-spacing-4)",
        gridTemplateColumns: "repeat(2, 300px)",
        justifyContent: "center",
      }}
    >
      <Card color="third" isLink={true}>
        <Link
          to="/SmartPack"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          {/* Ensuring the Link has no text decoration and inherits text color */}
          <Card.Media>
            <img alt="SmartPack" src={smartpackSketch} />
          </Card.Media>
          <Card.Header>
            <Heading size="small">SmartPack</Heading>
          </Card.Header>
          <Card.Content>
            Lurer du på noe angående bagasje? Hvor mye væske kan jeg ta med? Får
            jeg hesten min gjennom bagasjebåndet? Spør vår chatbot SmartPack!
          </Card.Content>
          <Card.Footer></Card.Footer>
        </Link>
      </Card>
      <Card color="third" isLink>
        <Link
          to="/BaggageGrid"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          {/* Ensuring the Link has no text decoration and inherits text color */}
          <Card.Media>
            <img alt="Informasjon" src={suitcase} />
          </Card.Media>
          <Card.Header>
            <Heading size="small">Informasjon</Heading>
          </Card.Header>
          <Card.Content>
            Trykk her for å lese mer om bagasje. Utfylte tabeller med all
            informasjonen du trenger for din flytur.
          </Card.Content>
          <Card.Footer></Card.Footer>
        </Link>
      </Card>
    </div>
  );
};

export default Index;