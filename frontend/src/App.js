import React, {useState, useEffect} from "react";

import api from "./Services/api";

import './app.css'
import './global.css'
import './sidebar.css'
import './main.css'

import Notes from "./Components/Notes";


function App() {
  const [title, setTitles] = useState('')
  const [notes, setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])

  useEffect(() => {
    async function getAllNotes(){
      const response = await api.get('/annotations')
      setAllNotes(response.data)
      console.log(response)
    }
    getAllNotes()
  }, [])

 async function handleSubmit(e){
    e.preventDefault()

    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })

    setTitles('')
    setNotes('')

    setAllNotes([...allNotes, response.data])
    
  }

  

  return (
   <div id="app">
    <aside>
      <strong>Caderno de Notas</strong>
      <form onSubmit={handleSubmit} >

        <div className="input-block">
          <label htmlFor="title">Titulo da Anotação</label>
          <input value={title} onChange={e => setTitles(e.target.value)}  />
        </div>
        <div className="input-block">
          <label htmlFor="nota">Anotações</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} required ></textarea>
        </div>
        <button style={{background: title.length > 0 && notes.length > 0 ? '#EB8F7A' : "FFD3CA"}} type="submit">Salvar</button>
      </form>
    </aside>
    <main>
      <ul>
        {allNotes.map(data => (
          <Notes key={data._id} data={data} />
        ))}
      </ul>
    </main>
   </div>
  );
}

export default App;
