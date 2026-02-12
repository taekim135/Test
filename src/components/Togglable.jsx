import { useState, useImperativeHandle } from 'react'


// for toggle switches
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // toggleVisibility available outside of compo
  useImperativeHandle(props.ref, () => {
    return {toggleVisibility}
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable