import React, { useState } from "react";

import { Link } from "react-router-dom";

import SignOutButton from "../SignOutButton";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : "")}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar mb-4 is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item has-text-weight-semibold" to="/">
            SYSTEM KOREPETYCJI
          </Link>
          <span
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <Link className="navbar-item" to={ROUTES.RESOURCES}>
              Dodane ogloszenie
            </Link>

            <Link className="navbar-item" to={ROUTES.RESERVED_BOOKS}>
              Zarezerwowane ogłoszenia
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  className="button is-primary has-text-white"
                  to={ROUTES.ADD_RESOURCE}
                >
                  Dodaj ogloszenie
                </Link>
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
