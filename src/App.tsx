import axios from "axios";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/Navbar/NavBar";
import { useEffect, useState } from "react";
import BaggageGrid from "./components/Main/BaggageGrid";
import Index from "./components/Main/Index";
import Chat from "./components/Main/Chat";
import Footer from "./components/Footer/Footer";
import CategoryCreateForm from "./components/Category/CategoryCreateForm";
import "@digdir/designsystemet-theme";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';



function App() {
  const [kategorier, setKategorier] = useState([]);

  return (
    <>
    <Router>
          <NavBar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/smartpack" element={<Chat />} />
              <Route path="/baggagegrid" element={<BaggageGrid />} />
            </Routes>
          </Router>
        <Footer />
    </>
  );
}

export default App;
