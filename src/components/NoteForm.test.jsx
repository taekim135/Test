import {render, screen} from "@testing-library/react"
import NoteForm from "./NoteForm"
import userEvent from "@testing-library/user-event"

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
    const createNote = vi.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)

    // access to input field
    const input = screen.getByRole("textbox")
    // const inputs = screen.getAllByRole("textbox")
    // OR
    // screen.getbyLabelText("labelName")
    //const input2 = screen.getByPlaceholderText("write note content here")
    const sendButton = screen.getByText("save")

    await user.type(input, "testing a form...")
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe("testing a form...")
})