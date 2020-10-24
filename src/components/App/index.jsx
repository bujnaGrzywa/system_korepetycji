import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.sass";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignInPage from "../SignIn";
import AddResource from "../AddResource";
import Resources from "../Resources";
import ReservedBooks from "../ReservedBooks";

import * as ROUTES from "../../constants/routes";

import { withAuthentication } from "../Session";

class App extends Component {
  listener = null;
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener();
    }
  }

  render() {
    return (
      <Router>
        <Navigation />
        <div className="container">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.ADD_RESOURCE} component={AddResource} />
          <Route path={ROUTES.RESOURCES} component={Resources} />
          <Route path={ROUTES.RESERVED_BOOKS} component={ReservedBooks} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
