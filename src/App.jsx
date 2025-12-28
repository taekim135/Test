// Part 2 Concepts/ Examples
// Part 2 Concepts/ Examples
// Part 2 Concepts/ Examples

import Footer from "./components/Footer"
import {useState, useEffect} from "react"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from "./components/Notification"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote,setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState("some error")

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      //id: String(notes.length + 1),
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
      
  }

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes=>{
      setNotes(initialNotes)
    })
  }, [])


  // const result = condition ? val1 : val2
  // if showAll is false -> don't show all notes so only show ones that are set to true
  //                                    filter array where each item 'note''s important is true
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // new note vs note from old array
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })

    .catch(error => {
       setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      console.log("Error Found during update:", error)
      setNotes(notes.filter(n => n.id !== id))
    })

    
  }

  if (!notes) {
    return <div>Loading...</div>
  }

  // to allow input change. 
  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <div>
        {/* The event handler switches the value of showAll from true to false and vice versa: */}
        <button onClick={() => setShowAll(!showAll)}>
          {/* The text of the button depends on the value of the showAll state: */}
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value = {newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   
      <Footer/>
    </div>
  )
}


export default App;