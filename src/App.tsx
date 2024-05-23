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
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";
import AdminPage from "./components/Admin/AdminPage";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isChatPage = location.pathname === "/smartpack";

  return (
    <Grid
      templateAreas={{
        base: '"nav" "main" "footer"',
      }}
      gap={6}
      className="app-grid"
    >
      {!isChatPage && (
        <GridItem area="nav">
          <NavBar />
        </GridItem>
      )}
      <GridItem area="main" px={15} py={20}>
        {children}
      </GridItem>
      {!isChatPage && (
        <GridItem area="footer">
          <Footer />
        </GridItem>
      )}
    </Grid>
  );
};

const App: React.FC = () => {
  const [kategorier, setKategorier] = useState([]);

  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Index />
              </Layout>
            }
          />
          <Route
            path="/smartpack"
            element={
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Chat />
              </div>
            }
          />
          <Route
            path="/baggagegrid"
            element={
              <Layout>
                <BaggageGrid />
              </Layout>
            }
          />
          <Route
            path="/AdminPage"
            element={
              <Layout>
                <AdminPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ContextProvider>
  );
};

export default App;