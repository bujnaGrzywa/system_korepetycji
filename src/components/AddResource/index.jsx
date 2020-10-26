import React from "react";

import { withAuthorization } from "../Session";

const days = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const months = [
  { id: "01", name: "styczeń" },
  { id: "02", name: "luty" },
  { id: "03", name: "marzec" },
  { id: "04", name: "kwiecień" },
  { id: "05", name: "maj" },
  { id: "06", name: "czerwiec" },
  { id: "07", name: "lipiec" },
  { id: "08", name: "sierpień" },
  { id: "09", name: "wrzesień" },
  { id: "10", name: "październik" },
  { id: "11", name: "listopad" },
  { id: "12", name: "grudzień" },
];

const groups = [
  { id: 1, name: "1 pr" },
  { id: 2, name: "1 in" },
  { id: 3, name: "2 in" },
  { id: 4, name: "3 in" },
];

const categories = [
  { id: 1, name: "matematyka" },
  { id: 2, name: "fizyka" },
  { id: 3, name: "chemia" },
];

const types = [
  { id: 1, name: "Udziele korepepetycji!" },
  { id: 2, name: "Potrzebuje pomocy!" },
];

const AddResource = ({ firebase, authUser }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const type = data.get("type");
    const price = data.get("price");
    const description = data.get("description");
    const category = data.get("category");
    const group = data.get("group");

    const startDay = data.get("startDay");
    const startMonth = data.get("startMonth");

    const endDay = data.get("endDay");
    const endMonth = data.get("endMonth");

    const startDate = `${startDay}-${startMonth}`;

    const endDate = `${endDay}-${endMonth}`;

    const uid = authUser.uid;
    const email = authUser.email;

    const lesson = {
      startDate,
      endDate,
      type,
      description,
      reserved: false,
      uid,
      price,
      email,
      reserved_uid: null,
      category,
      group,
    };

    firebase.selectLessonsByUser(uid).push(lesson);
    alert("Ogłoszenie zostało dodane!");

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="field">
          <div className="control">
            <div className="select mr-2">
              <select name="type">
                {types.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
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
        <div style={{ color: "#fff", padding: "0 0 10px 0" }}>
          Ustaw termin początkowy:
        </div>
        <div className="select mr-2">
          <select className="select" name="startDay">
            {days.map((day) => (
              <option key={`day-${day}`} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="select mr-2">
          <select name="startMonth">
            {months.map((month) => (
              <option key={month.id} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <div style={{ color: "#fff", padding: "0 0 10px 0" }}>
          Ustaw termin końcowy:
        </div>
        <div className="select mr-2">
          <select className="select" name="endDay">
            {days.map((day) => (
              <option key={`day-${day}`} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="select mr-2">
          <select name="endMonth">
            {months.map((month) => (
              <option key={month.id} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <div style={{ color: "#fff", padding: "0 0 10px 0" }}>Przedmiot:</div>
        <div className="select mr-2">
          <select className="select" name="category">
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <div style={{ color: "#fff", padding: "0 0 10px 0" }}>Klasa:</div>
        <div className="select mr-2">
          <select className="select" name="group">
            {groups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
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
