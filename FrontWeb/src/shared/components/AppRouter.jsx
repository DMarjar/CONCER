import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthContext } from "./../../modules/auth/authContext";
import { LoginScreen } from "./../../modules/auth/LoginScreen";
import { Navbar } from "./navbar/Navbar";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              <>
                <Navbar />
                <Container style={{ marginTop: "20px" }}>
                  <Routes>
                    <Route path="/" />
                    <Route path="/user" />
                    <Route path="*" element={<>ERROR 404</>} />
                  </Routes>
                </Container>
              </>
            ) : (
              <>
                <PublicNavbar />
                <Container style={{ marginTop: "20px" }}>
                  <Routes>
                    <Route path="more-info/:id" element={<>MOREINFO</>} />
                    <Route path="contact" element={<>Contact</>} />
                    <Route index element={<>INDEX</>} />
                    <Route path="*" element={<>ERROR 404</>} />
                  </Routes>
                </Container>
              </>
            )
          }
        />
        <Route path="*" element={<>ERROR 404</>} />
      </Routes>
    </Router>
  );
};
