import React from "react";

const ListItem = ({ lesson, onHandle, label }) => {
  return (
    <div className="box has-background-grey">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="is-size-4 is-capitalized has-text-weight-semibold">
                {lesson.title}
              </p>
              <p className="is-size-6">Kategoria: {lesson.category}</p>
              <p className="is-size-5">Cena: {lesson.price} PLN</p>
              <p className="is-size-6">
                Proponowana data: {lesson.startDate} - {lesson.endDate}
              </p>
            </div>
          </div>

          {onHandle ? (
            <div className="content">
              <div className="mb-2">Opis: {lesson.description}</div>

              {label && (
                <button
                  className="button is-primary"
                  disabled={lesson?.reserved}
                  onClick={() => onHandle()}
                >
                  {label}
                </button>
              )}
            </div>
          ) : (
            <p className="is-size-6">Kontakt: {lesson.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ListItem };
