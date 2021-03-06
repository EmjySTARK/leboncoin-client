import React from "react";
import Button from "./Button/Button";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { ReactComponent as MenuBtn } from "../../assets/img/menu-button.svg";
import { ReactComponent as CloseBtn } from "../../assets/img/close-button.svg";

import {
  ROUTE_SIGNUP,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_PUBLISH,
  ROUTE_OFFERS
} from "../../constant/routes";

import "./Header.css";

function Header(props) {
  const { token, username, toggleMenu, isToggle } = props;

  let renderNav;

  const logOut = (
    <>
      <Button to={ROUTE_LOGIN} toggleMenu={toggleMenu}>
        Se connecter
      </Button>
      <Button to={ROUTE_SIGNUP} toggleMenu={toggleMenu}>
        Créer un compte
      </Button>
    </>
  );

  const logIn = (
    <>
      <Button to={ROUTE_PROFILE} toggleMenu={toggleMenu}>
        Hello {username}
      </Button>
      <button onClick={() => props.logOut()}>Se déconnecter</button>
    </>
  );

  if (token) {
    renderNav = logIn;
  } else {
    renderNav = logOut;
  }

  return (
    <header className="header">
      <div className={`wrapper flex ${isToggle ? "flex-xs" : ""}`}>
        <Button to="/">
          <Logo />
        </Button>
        <menu
          id="menu"
          className="show-xs"
          onClick={() => {
            toggleMenu();
          }}
        >
          {isToggle ? <CloseBtn /> : <MenuBtn />}
        </menu>
        <div className={`nav ${isToggle ? "menu-open" : "hidden-xs"}`}>
          <Button to={ROUTE_PUBLISH} toggleMenu={toggleMenu}>
            Déposer une annonce
          </Button>
          <Button to={ROUTE_OFFERS} toggleMenu={toggleMenu}>
            offres
          </Button>
          <div className="account-panel">{renderNav}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
