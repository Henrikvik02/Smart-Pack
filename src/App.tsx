import axios from "axios";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/Navbar/NavBar";
import { useEffect, useState } from "react";
import BaggageGrid from "./components/Main/BaggageGrid";
import Index from "./components/Main/Index";
import Chat from "./components/Main/Chat";
import Sidebar from "./components/Main/Sidebar";
import Footer from "./components/Footer/Footer";
import "@digdir/designsystemet-theme";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";
import AdminPage from "./components/Admin/AdminPage";

function App() {
  const [kategorier, setKategorier] = useState([]);

  return (
    <>
      <ContextProvider>
        <Router>
          <Grid
            templateAreas={{
              base: '"nav" "main" "footer"',
            }}
            gap={6}
            className="app-grid"
          >
            <GridItem area="nav">
              <NavBar />
            </GridItem>
            <GridItem area="main" px={15} py={20}>
              <AdminPage/>
            </GridItem>
            <GridItem area="footer">
              <Footer />
            </GridItem>
          </Grid>
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
