import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Validation from "../../Validation/Validation";
import domain from "../../assets/domain";

import { ROUTE_LOGIN, ROUTE_OFFERS, ROUTE_SIGNUP } from "../../constant/routes";

import "./LogIn.css";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    isValid: true
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    const { email, password } = this.state;
    const { history, setUser } = this.props;

    event.preventDefault();
    try {
      const response = await axios.post(domain + ROUTE_LOGIN, {
        email: email,
        password: password
      });
      if (response.data.message === "wrong password") {
        console.log("wrong password");
        this.setState({
          isValid: false
        });
      }
      // console.log(response);
      if (response.data.token) {
        setUser(response.data);
        await this.setState({
          isValid: true
        });
        history.push(ROUTE_OFFERS);
        console.log("success, check cookies");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { email, password, isValid } = this.state;

    return (
      <div className="wrapper connection">
        <div className="sign-in-flex">
          <section>
            <h1>Connexion</h1>
            <form onSubmit={this.handleSubmit} className="form">
              <div className="form-item">
                <label htmlFor="email">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="mern@gmail.com"
                  required
                />
              </div>

              <div className="form-item">
                <div className="form-item">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    style={{
                      boxShadow: !isValid && "0 0 0 3px red inset"
                    }}
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <Validation isValid={isValid} />
              </div>

              <button type="submit">Se connecter</button>
            </form>

            <div className="create-account-redirect">
              <p>Vous n'avez pas de compte ?</p>
              <Link className="btn" to={ROUTE_SIGNUP}>
                Créer un compte
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default LogIn;
