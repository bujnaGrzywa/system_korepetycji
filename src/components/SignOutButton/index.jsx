import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button
    className="button is-outlined is-primary"
    type="button"
    onClick={firebase.doSignOut}
  >
    Wyloguj
  </button>
);

export default withFirebase(SignOutButton);
