import React from "react";

const ListItem = ({ book, onHandle, label }) => (
  <div className="box has-background-grey">
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="is-size-4 is-capitalized has-text-weight-semibold">
              {book.title}
            </p>
            <p className="is-size-6">
              Proponowana data: {book.startDate} - {book.endDate}
            </p>
          </div>
        </div>

        {onHandle ? (
          <div className="content">
            <div className="mb-2">{book.description}</div>

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

export { ListItem };
