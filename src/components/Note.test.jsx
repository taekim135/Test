import {render, screen} from "@testing-library/react"
import Note from "./Note"

// import component to test
// import render & screen (testing tools)

// testing note component
test("renders content", () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true
    }

    render(<Note note={note} />)

    // check if the component exists
    const element = screen.getByText("Component testing is done with react-testing-library")
    expect(element).toBeDefined()
})