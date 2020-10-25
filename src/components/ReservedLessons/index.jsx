import React, { useEffect, useState, useCallback } from "react";

import { withAuthorization } from "../Session";

import { ListItem } from "../ListItem";
import { LoadingSpinner } from "../LoadingSpinner";

const ReservedLessons = ({ firebase, authUser }) => {
  const [lessonsList, setLessonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLessons = useCallback(() => {
    firebase
      .selectReservedLessons(authUser.uid)
      .on("value", async (snapshot) => {
        if (snapshot.val()) {
          setIsLoading(false);
        } else {
          setError("Brak zawartości do wyświetlenia");
          setIsLoading(false);
        }

        const lessonsObj = snapshot.val();
        if (lessonsObj) {
          const lessons = [];

          for (let lesson_uid in lessonsObj) {
            await firebase
              .selectLesson(
                `${lessonsObj[lesson_uid].lesson_uid}/${lesson_uid}`
              )
              .on("value", async (lesson) => {
                if (lesson.val().reserved_uid === authUser.uid) {
                  lessons.push(await lesson.val());

                  setLessonsList([...lessons]);
                }
              });
          }
        }
      });
  }, [authUser, firebase]);

  useEffect(() => {
    fetchLessons();

    return () => {
      firebase.selectReservedLessons(authUser.uid).off();
      firebase.selectLesson().off();
    };
  }, [firebase, authUser, fetchLessons]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      {lessonsList.map((lesson, index) => (
        <ListItem key={index} lesson={lesson} index={index} />
      ))}
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ReservedLessons);
