import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
// import axios from 'axios'



// Effect hooks - fetching data from server. Thus no passing data as props
// Effects let a component connect to and synchronize with external systems. 
// network, browser DOM, animations, widgets written using a different UI library, 
//const promise = axios.get('http://localhost:3001/notes')
// .then() gives the result of the promise. (response)
// promise.then(response => {
//   console.log(response)
//   console.log(response.data)
// })

ReactDOM.createRoot(document.getElementById('root')).render(<App />)