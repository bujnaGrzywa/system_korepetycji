import React, { useEffect, useState } from "react";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import { ListItem } from "../ListItem";
import { LoadingSpinner } from "../LoadingSpinner";

const Resources = ({ firebase, authUser }) => {
  const [booksList, setBooksList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase.selectBooksByUser(authUser.uid).on("value", (snapshot) => {
      if (snapshot.val()) {
        setIsLoading(false);
      } else {
        setError("Brak zawartości do wyświetlenia");
        setIsLoading(false);
      }
      setBooksList(snapshot.val());
    });
    return () => {
      firebase.selectBooksByUser(authUser.uid).off();
    };
  }, [authUser.uid, firebase]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      {booksList
        ? Object.keys(booksList).map((book, index) => (
            <ListItem key={index} book={booksList[book]} />
          ))
        : null}
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(Resources));
