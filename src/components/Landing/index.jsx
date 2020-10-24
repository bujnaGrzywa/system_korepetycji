import React, { useEffect, useState } from "react";

import { withAuthorization } from "../Session";

import { ListItem } from "../ListItem";
import { Modal } from "../Modal";
import { LoadingSpinner } from "../LoadingSpinner";

import usePagination from "../../utils/pagination";

const Landing = ({ firebase, authUser }) => {
  const [selectedBookIndex, setSelectedBookIndex] = useState({});
  const [isModalActive, setIsModalActive] = useState(false);
  const [booksList, setBooksList] = useState([]);
  const [itemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentData, next, prev } = usePagination(booksList, itemsPerPage);
  const data = currentData();

  useEffect(() => {
    firebase.selectBooks().on("value", (snapshot) => {
      if (snapshot.val()) {
        setIsLoading(false);
      } else {
        setError("Brak zawartości do wyświetlenia");
        setIsLoading(false);
      }
      const booksObj = snapshot.val();
      const books = [];
      if (booksObj) {
        for (let user_id in booksObj) {
          for (let book_id in booksObj[user_id]) {
            booksObj[user_id][book_id]._id = book_id;
            books.push(booksObj[user_id][book_id]);
          }
        }
        setBooksList(books);
      }
    });

    return () => {
      firebase.selectBooks().off();
    };
  }, [firebase]);

  const handleReserveClick = (book) => {
    firebase.selectBook(`${book.uid}/${book._id}`).set({
      ...book,
      reserved: true,
      reserved_uid: authUser.uid,
    });

    firebase
      .selectReservedBook(authUser.uid, book._id)
      .set({ book_uid: book.uid });
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
        selectedBook={data[selectedBookIndex]}
        onSave={() => {
          handleReserveClick(data[selectedBookIndex]);
          setIsModalActive(false);
        }}
        onCancel={() => {
          setIsModalActive(false);
        }}
      />

      {data.map((book, index) => (
        <ListItem
          key={book._id}
          book={book}
          onHandle={() => {
            setSelectedBookIndex(index);
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
