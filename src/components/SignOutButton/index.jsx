import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button
    className="button"
    type="button"
    onClick={firebase.doSignOut}
  >
    Wyloguj
  </button>
);

export default withFirebase(SignOutButton);
