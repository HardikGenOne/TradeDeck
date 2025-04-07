import './App.css';
import Login from "./components/login"
import SignUp from "./components/signup"
import Profile from "./components/profile"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify"

function App() {

return (
    <>
      <Router>
          <div className="App">
            <div className='auth-wrapper'>
              <div className='auth-inner'>
                <Routes>
                  <Route path = "/" element = {<Login/>}/>
                  <Route path = "/login" element = {<Login/>}/>
                  <Route path = "/signup" element = {<SignUp/>}/>
                  <Route path = "/profile" element = {<Profile/>}/>

                </Routes>
                <ToastContainer/>
              </div>
            </div>
          </div>
      </Router>
    </>
  )
}

export default App
