// FRONT END EXAMPLE
// npm run dev on both back & front

import Footer from "./components/Footer"
import {useState, useEffect, useRef} from "react"
import Note from "./components/Note"
import noteService from "./services/notes"
import Notification from "./components/Notification"
import loginService from "./services/login"
import LoginForm from "./components/Login"
import Togglable from "./components/Togglable"
import NoteForm from "./components/NoteForm"

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try{
            // token + credentials saved to user state if successful
            const user = await loginService.login({username, password})

            // save token to browser's local storage
            // (harddrive but into browser's app folder)
            window.localStorage.setItem(
                "loggedNoteappUser", JSON.stringify(user)
            )

            noteService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        }catch {
            setErrorMessage("Incorrect username or password")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    //helper function to display login form
    // only if the user is not logged in (user state is null)
    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({target}) => setUsername(target.value)}
                handlePasswordChange={({target}) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    const noteFormRef = useRef()
    // only allow logged-in users to add new notes (user sate has value)
    const noteForm = () => (
        <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote}/>
        </Togglable>
    )

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])


    // when opening the page, check if user login details are already saved
    // if so, fetch and set the states
    // otherwise let them login
    // REMOVING LOGIN DETAILS = LOGOUT
    //    .removeItem(itemName) or .clear()
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
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

    return (
        <div>
            <h1>Notes</h1>
            <Notification message = {errorMessage}/>
            {/* if user is null then execute loginForm */}
            {!user && loginForm()}

            {/* if user is logged in, show they are logged in */}
            {user && (
                <div>
                    <p>{user.name} logged in</p>
                    {noteForm()}
                </div>
            )}

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
            <Footer/>
        </div>
    )
}


export default App