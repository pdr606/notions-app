import React, { useState, useEffect } from "react";

import api from "./Services/api";

import "./app.css";
import "./global.css";
import "./sidebar.css";
import "./main.css";

import Notes from "./Components/Notes";
import RadioButton from "./Components/RadioButton";

function App() {
  const [title, setTitles] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [valueRadio, setValueRadio] = useState("Todos");

  async function getAllNotes() {
    const response = await api.get("/annotations");
    setAllNotes(response.data);
  }

  async function loadNotes(option) {
    const params = { priority: option };
    const response = await api.get("/priorities", { params });

    if (response) {
      setAllNotes(response.data);
    }
  }

  useEffect(() => {
    if (valueRadio !== "Todos") {
      if (valueRadio === "Prioridade") {
        loadNotes("true");
      } else if (valueRadio === "Normal") {
        loadNotes("false");
      }
    } else {
      getAllNotes();
    }
  }, [valueRadio]);

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`);

    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }
  }

  async function handleChange(id) {
    const note = await api.post(`/priorities/${id}`);

    if (note && valueRadio !== "Todos") {
      if (valueRadio === "Prioridade") {
        loadNotes("true");
      } else if (valueRadio === "Normal") {
        loadNotes("false");
      }
    } else if (note) {
      getAllNotes();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/annotations", {
      title,
      notes,
      priority: false,
    });

    setTitles("");
    setNotes("");

    setAllNotes([...allNotes, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Titulo da Anotação</label>
            <input
              maxLength={60}
              value={title}
              onChange={(e) => setTitles(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            style={{
              background:
                title.length > 0 && notes.length > 0 ? "#EB8F7A" : "FFD3CA",
            }}
            type="submit"
          >
            Salvar
          </button>
        </form>
        <RadioButton
          options={["Todos", "Prioridade", "Normal"]}
          value={valueRadio}
          setValue={setValueRadio}
        />
      </aside>
      <main>
        <ul>
          {allNotes.map((data) => (
            <Notes
              handleChange={handleChange}
              handleDelete={handleDelete}
              key={data._id}
              data={data}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
