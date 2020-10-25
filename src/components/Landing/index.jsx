import React, { useEffect, useState } from "react";

import { withAuthorization } from "../Session";

import { ListItem } from "../ListItem";
import { Modal } from "../Modal";
import { LoadingSpinner } from "../LoadingSpinner";

import usePagination from "../../utils/pagination";

const Landing = ({ firebase, authUser }) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState({});
  const [isModalActive, setIsModalActive] = useState(false);
  const [lessonsList, setLessonsList] = useState([]);
  const [itemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentData, next, prev } = usePagination(lessonsList, itemsPerPage);
  const data = currentData();

  useEffect(() => {
    firebase.selectLessons().on("value", (snapshot) => {
      if (snapshot.val()) {
        setIsLoading(false);
      } else {
        setError("Brak zawartości do wyświetlenia");
        setIsLoading(false);
      }
      const lessonsObj = snapshot.val();
      const lessons = [];
      if (lessonsObj) {
        for (let user_id in lessonsObj) {
          for (let lesson_id in lessonsObj[user_id]) {
            lessonsObj[user_id][lesson_id]._id = lesson_id;
            lessons.push(lessonsObj[user_id][lesson_id]);
          }
        }
        setLessonsList(lessons);
      }
    });

    return () => {
      firebase.selectLessons().off();
    };
  }, [firebase]);

  const handleReserveClick = (lesson) => {
    firebase.selectLesson(`${lesson.uid}/${lesson._id}`).set({
      ...lesson,
      reserved: true,
      reserved_uid: authUser.uid,
    });

    firebase
      .selectReservedLesson(authUser.uid, lesson._id)
      .set({ lesson_uid: lesson.uid });
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      <Modal
        isActive={isModalActive}
        selectedLesson={data[selectedLessonIndex]}
        onSave={() => {
          handleReserveClick(data[selectedLessonIndex]);
          setIsModalActive(false);
        }}
        onCancel={() => {
          setIsModalActive(false);
        }}
      />

      {data.map((lesson, index) => (
        <ListItem
          key={lesson._id}
          lesson={lesson}
          onHandle={() => {
            setSelectedLessonIndex(index);
            setIsModalActive(true);
          }}
          label="Zarezerwuj"
        />
      ))}

      <div>
        <button className="button is-outlined is-primary" onClick={prev}>
          Poprzednia strona
        </button>
        <button className="button ml-2 is-outlined is-primary" onClick={next}>
          Kolejna strona
        </button>
      </div>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Landing);
