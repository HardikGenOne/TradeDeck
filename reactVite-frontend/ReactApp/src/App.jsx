import './App.css';
import Login from "./components/login"
import SignUp from "./components/signup"
import Profile from "./components/profile"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify"

import FetchDataComponent from "./components/getdata"

import Home_Page from "./components/Home_Page"
import Heatmap from './components/heatmap';
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className='auth-wrapper'>
            <div className='auth-inner'>
              {/* <h2>Hello</h2>  */}
              <Routes>
                <Route path="/" element={<Home_Page/>} />
                <Route path="/home" element={<Home_Page/>} />

                <Route path = "/fetchData" element = {<FetchDataComponent/>}></Route>
                <Route path="/heatmap" element={<Heatmap/>} />


                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
   
              <ToastContainer />
            </div>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
