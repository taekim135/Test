import {render, screen} from "@testing-library/react"
import Note from "./Note"
import userEvent from "@testing-library/user-event"

// import component to test
// import render & screen (testing tools)

// testing note component
test("renders content", () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true
    }

    render(<Note note={note} />)

    // prints the html componenet of the render to terminal
    screen.debug()

    // check if the component exists
    // getByText -> by default looks for eact match
    // thus, ("String", {exact: false})
    // .getByTestId ->
    // .queryByText -> same as getByText but no exception thrown when not found.
    // ensures that something is not rendered. elements shouldn't exist
    // .findbyText -> returns a promise. Thus await screem.findByText()
    const element = screen.getByText("Component testing is done with react-testing-library")

    screen.debug(element)
    expect(element).toBeDefined()

    // BELOW using css selector to find elements
    const {container} = render(<Note note={note} />)

    const div = container.querySelector(".note")
    expect(div).toHaveTextContent(
        "Component testing is done with react-testing-library"
    )
})

test("does not render this", () => {
    const note = {
        content: "This is a reminder",
        important: true
    }

    render(<Note note={note} />)

    const element = screen.queryByText("do not want this thing to be rendered")
    expect(element).toBeNull()
})

test("clicking the button calls event handler once", async () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true
    }

    // event handler - function to run when clicked
    const mockHandler = vi.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText("make not important")
    await user.click(button)

    // expect a function tobe called once. Hence length of 1
    expect(mockHandler.mock.calls).toHaveLength(1)

})