import { Col, Row } from "react-bootstrap";
import React from "react";
import { NavbarAll } from "../../shared/components/Navbar";
import { AsideUser } from "../../shared/components/AsideUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from '../home/Home';

import Indicadores from "../indicadores/Indicadores";
import Profile from "../profile/Profile";



export const IndexUser = () => {
  return (
    <>
      <Row className="m-0">
        <NavbarAll />
      </Row>

      <div className="container-fluid" >     
        <Row className="h-100 square border border-2 border-light " style={{ height: "100vh" }}>
          <Col
            className="col-lg-2 col-md-3 col-sm-3 square border border-bottom-0 m-0"
            style={{ height: "89vh", position: "relative" }}
          >
            <AsideUser />
          </Col>
          <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0"
              style={{ height: "89vh", position: "relative", overflow: "auto" }}
          >
            <section className="container-fluid">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/indicators" element={<Indicadores/>} />
                <Route path="/profile" element={<Profile/>} />

                
              </Routes>
            </section>
          </Col>
        </Row>
      </div>
    </>

  );
};
