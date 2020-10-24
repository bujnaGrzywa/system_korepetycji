import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignIn = () => (
  <div className="columns is-centered">
    <div className="column is-half">
      <SignInForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="box mt-6">
        <form onSubmit={this.onSubmit}>
          <p className="is-4 title is-uppercase has-text-centered">
            kiermasz książek
          </p>

          <div className="field">
            <div className="control">
              <input
                className="input"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                className="input"
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="has-text-centered">
            <button
              className="button is-primary"
              disabled={isInvalid}
              type="submit"
            >
              Zaloguj
            </button>
          </div>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignIn;

export { SignInForm };
