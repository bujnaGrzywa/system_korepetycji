import React, { useEffect, useState, useCallback } from "react";

import { withAuthorization } from "../Session";

import { ListItem } from "../ListItem";
import { LoadingSpinner } from "../LoadingSpinner";

const ReservedBooks = ({ firebase, authUser }) => {
  const [booksList, setBooksList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(() => {
    firebase.selectReservedBooks(authUser.uid).on("value", async (snapshot) => {
      if (snapshot.val()) {
        setIsLoading(false);
      } else {
        setError("Brak zawartości do wyświetlenia");
        setIsLoading(false);
      }

      const booksObj = snapshot.val();
      if (booksObj) {
        const books = [];

        for (let book_uid in booksObj) {
          await firebase
            .selectBook(`${booksObj[book_uid].book_uid}/${book_uid}`)
            .on("value", async (book) => {
              if (book.val().reserved_uid === authUser.uid) {
                books.push(await book.val());

                setBooksList([...books]);
              }
            });
        }
      }
    });
  }, [authUser, firebase]);

  useEffect(() => {
    fetchBooks();

    return () => {
      firebase.selectReservedBooks(authUser.uid).off();
      firebase.selectBook().off();
    };
  }, [firebase, authUser, fetchBooks]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      {booksList.map((book, index) => (
        <ListItem key={index} book={book} index={index} />
      ))}
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ReservedBooks);
