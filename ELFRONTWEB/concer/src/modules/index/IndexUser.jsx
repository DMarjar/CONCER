import { Col, Row } from "react-bootstrap";
import React from "react";
import { NavbarAll } from "../../shared/components/Navbar";
import { AsideUser } from "../../shared/components/AsideUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from '../home/Home';


export const IndexUser = () => {
  return (
    <>
      <div className="container-fluid" >
        <Row className="m-0">
          <NavbarAll />
        </Row>

        <Row className="h-100 square border border-2 border-light " style={{ height: "100vh" }}>
          <Col
            className="col-lg-2 col-md-3 col-sm-3 square border border-bottom-0 m-0"
            style={{ height: "600px", position: "relative" }}
          >
            <AsideUser />
          </Col>
          <Col className="col-lg-10 col-md-9 col-sm-9 square border border-bottom-0 m-0">
            <section className="container-fluid">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<h1>About</h1>} />
                <Route path="contact" element={<h1>Contact</h1>} />
              </Routes>
            </section>
          </Col>
        </Row>
      </div>
    </>
  );
};
