import React from "react";

import { withAuthorization } from "../Session";

const categories = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
  { id: 8, name: "8" },
  { id: 9, name: "9" },
  { id: 10, name: "10" },
  { id: 11, name: "11" },
  { id: 12, name: "12" },
  { id: 13, name: "13" },
  { id: 14, name: "14" },
  { id: 15, name: "15" },
  { id: 16, name: "16" },
  { id: 17, name: "17" },
  { id: 18, name: "18" },
  { id: 19, name: "19" },
  { id: 20, name: "20" },
  { id: 21, name: "21" },
  { id: 22, name: "22" },
  { id: 23, name: "23" },
  { id: 24, name: "24" },
  { id: 25, name: "25" },
  { id: 26, name: "26" },
  { id: 27, name: "27" },
  { id: 28, name: "28" },
  { id: 29, name: "29" },
  { id: 30, name: "30" },
  { id: 31, name: "31" },



];

const types = [
  { id: 1, name: "2020" },
  { id: 2, name: "2021" },
  { id: 3, name: "2022" },
  { id: 4, name: "2023" },

];

const conditions = [
  { id: 1, name: "01" },
  { id: 2, name: "02" },
  { id: 3, name: "03" },
  { id: 4, name: "04" },
  { id: 5, name: "05" },
  { id: 6, name: "06" },
  { id: 7, name: "07" },
  { id: 8, name: "08" },
  { id: 9, name: "09" },
  { id: 10, name: "10" },
  { id: 11, name: "11" },
  { id: 12, name: "12" },
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
