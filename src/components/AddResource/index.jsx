import React from "react";

import { withAuthorization } from "../Session";

const categories = [
  { id: 1, name: "matematyka" },
  { id: 2, name: "fizyka" },
  { id: 3, name: "biologia" },
];

const types = [
  { id: 1, name: "po gimnazjum" },
  { id: 2, name: "po podstawówce" },
];

const conditions = [
  { id: 1, name: "bardzo zniszczona" },
  { id: 2, name: "troche zniszczona" },
  { id: 3, name: "używana ale nie zniszczona" },
  { id: 4, name: "lekko uzywana" },
  { id: 5, name: "nowa" },
];

const AddResource = ({ firebase, authUser }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const title = data.get("title");
    const category_id = data.get("category");
    const condition = data.get("condition");
    const price = data.get("price");
    const description = data.get("description");
    const type = data.get("type");
    const uid = authUser.uid;
    const email = authUser.email;

    const book = {
      category_id,
      title,
      description,
      reserved: false,
      uid,
      price,
      condition,
      email,
      reserved_uid: null,
      type,
    };

    firebase.selectBooksByUser(uid).push(book);

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              placeholder="Tytuł"
              type="text"
              name="title"
              required
            />
          </div>
        </div>
        <input
          className="input"
          placeholder="Cena"
          type="number"
          name="price"
          required
        />
      </div>
      <div className="mt-3">
        <div className="select mr-2">
          <select className="select" name="category">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="select mr-2">
          <select name="condition">
            {conditions.map((condition) => (
              <option key={condition.id} value={condition.name}>
                {condition.name}
              </option>
            ))}
          </select>
        </div>

        <div className="select">
          <select name="type">
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <textarea
          className="textarea"
          placeholder="Opis"
          name="description"
          cols="30"
          rows="10"
          required
        ></textarea>
      </div>

      <div className="mt-3">
        <input
          className="button is-primary"
          type="submit"
          value="Zapisz oferte"
        />
      </div>
    </form>
  );
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AddResource);
