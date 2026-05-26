import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {

  const BASE_URL = "http://localhost:3000";
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get(BASE_URL + "/api/notes").then(
      (res) => { setNotes(res.data.notes) }
    )
  }

  function createNote(title, description) {
    axios.post(BASE_URL + "/api/notes", { title: title, description: description }).then(
      (res) => {
        console.log(res.data.message)
        fetchNotes()
      }
    )
  }

  function deleteNote(id) {
    axios.delete(BASE_URL + "/api/notes/" + id).then(
      (res) => {
        console.log(res.data.message)
        fetchNotes()
      }
    )
  }

  function handleSubmit(e) {
    e.preventDefault();

    let { title, description } = e.target.elements;
    createNote(title.value, description.value)

  }

  function handleDelete(id) {
    deleteNote(id);
  }

  useEffect(() => {
    fetchNotes();
  }, [])


  return (
    <>

      <div className="notes">
        <div class="create-note">
          <h2>Create Note</h2>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Enter note title" />
            <textarea name="description" placeholder="Enter note description"></textarea>
            <button>Create</button>
          </form>
        </div>
        {notes.map((note) => {
          return <div className="note">
            <h2 className="title">{note.title}</h2>
            <p className="description">{note.description}</p>
            <button class="delete-note" onClick={() => { handleDelete(note._id) }}>Delete</button>
          </div>

        })}
      </div>
    </>
  )
}

export default App