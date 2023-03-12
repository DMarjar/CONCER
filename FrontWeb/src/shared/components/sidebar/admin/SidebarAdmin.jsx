import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUserGraduate,
  faUserTie,
  faCertificate,
  faBuilding,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import "./SidebarAdmin.css";

export const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar__title">Certification Control</h3>
      <hr />
      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <Link to="/indicators" className="sidebar__link">
            <FontAwesomeIcon icon={faChartBar} className="sidebar__icon" />
            Indicators
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to="/candidates" className="sidebar__link">
            <FontAwesomeIcon icon={faUserGraduate} className="sidebar__icon" />
            Candidates
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to="/certification-personnel" className="sidebar__link">
            <FontAwesomeIcon icon={faUserTie} className="sidebar__icon" />
            Certification Personnel
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to="/certifications" className="sidebar__link">
            <FontAwesomeIcon icon={faCertificate} className="sidebar__icon" />
            Certifications
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to="/certifying-companies" className="sidebar__link">
            <FontAwesomeIcon icon={faBuilding} className="sidebar__icon" />
            Certifying Companies
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to="/utez" className="sidebar__link">
            <FontAwesomeIcon icon={faUniversity} className="sidebar__icon" />
            UTEZ
          </Link>
        </li>
      </ul>
      <button className="sidebar__signout">Sign Out</button>
    </div>
  );
};
