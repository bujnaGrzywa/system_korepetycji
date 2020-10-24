import React from "react";

const Modal = ({ isActive, onSave, onCancel, selectedBook }) => {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Zarezerwuj</p>
        </header>

        <section className="modal-card-body">
          Poprzez rezerwację książki zobowiązujesz się do jej kupna. Anulacja
          rezerwacji nie będzie możliwa. Czy na pewno chcesz zarezerwować
          książkę?
        </section>

        <footer className="modal-card-foot">
          <button
            className="button is-primary"
            disabled={selectedBook?.reserved}
            onClick={() => {
              onSave();
            }}
          >
            Rozumiem i chcę zarezerwować
          </button>
          <button
            className="button"
            onClick={() => {
              onCancel();
            }}
          >
            Anuluj
          </button>
        </footer>
      </div>
    </div>
  );
};

export { Modal };
