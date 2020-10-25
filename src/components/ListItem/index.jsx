import React from "react";

const ListItem = ({ book, onHandle, label }) => {
  return (
    <div className="box has-background-grey">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="is-size-4 is-capitalized has-text-weight-semibold">
                {book.title}
              </p>
              <p className="is-size-6">Kategoria: {book.category}</p>
              <p className="is-size-5">Cena: {book.price} PLN</p>
              <p className="is-size-6">
                Proponowana data: {book.startDate} - {book.endDate}
              </p>
            </div>
          </div>

          {onHandle ? (
            <div className="content">
              <div className="mb-2">Opis: {book.description}</div>

              {label && (
                <button
                  className="button is-primary"
                  disabled={book?.reserved}
                  onClick={() => onHandle()}
                >
                  {label}
                </button>
              )}
            </div>
          ) : (
            <p className="is-size-6">Kontakt: {book.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ListItem };
