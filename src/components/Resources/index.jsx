import React, { useEffect, useState } from "react";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import { ListItem } from "../ListItem";
import { LoadingSpinner } from "../LoadingSpinner";

const Resources = ({ firebase, authUser }) => {
  const [lessonsList, setLessonsList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase.selectLessonsByUser(authUser.uid).on("value", (snapshot) => {
      if (snapshot.val()) {
        setIsLoading(false);
      } else {
        setError("Brak zawartości do wyświetlenia");
        setIsLoading(false);
      }
      setLessonsList(snapshot.val());
    });
    return () => {
      firebase.selectLessonsByUser(authUser.uid).off();
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
      {lessonsList
        ? Object.keys(lessonsList).map((lesson, index) => (
            <ListItem key={index} lesson={lessonsList[lesson]} />
          ))
        : null}
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(Resources));
