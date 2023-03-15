import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./../../modules/auth/authContext";
import { AllNavbar } from "./navbar/AllNavbar";
import SidebarCandidate from "./sidebar/admin/candidate/SidebarCandidate";
import MainCandidate from "./sidebar/admin/MainCandidate";
import LoginSreen from "../../modules/auth/LoginScreen";

export const AppRouter = () => {
    const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginSreen />} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              <>
                <AllNavbar />
                <>CONTENIDO LOGEADO</>
              </>
            ) : (
              <>
                <AllNavbar />
                <Row style={{height: "620px"}} className="h-300 bg-secondary">
                  <Col className='col-lg-2 col-md-3 square border border-2 h-100' style={{height: "300px", position: "relative"}}>
                    <SidebarCandidate />
                  </Col>
                  <Col className='col-lg-10 col-md-9 square border border-2'>
                    <MainCandidate />
                  </Col>
                </Row>

              </>
            )
          }
        />
        <Route path="*" element={<>ERROR 404</>} />
      </Routes>
    </Router>
  );
};