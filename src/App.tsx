import axios from "axios";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/Navbar/NavBar";
import { useEffect, useState } from "react";
import BaggageGrid from "./components/Main/BaggageGrid";
import Footer from "./components/Footer/Footer";
import CategoryCreateForm from "./components/Category/CategoryCreateForm";
import "@digdir/designsystemet-theme";

function App() {
  const [kategorier, setKategorier] = useState([]);

  return (
    <>
      <Grid
        templateAreas={{
          base: '"nav" "main" "footer"',
        }}
        className="app-grid"
      >
        <GridItem area="nav" className="nav-area">
          <NavBar />
        </GridItem>
        <GridItem area="main" px={15} py={20} className="main-content-area">
          <BaggageGrid />
        </GridItem>
        <GridItem area="footer" className="footer-area">
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
