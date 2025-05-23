import './App.css';
import Login from "./components/Pages/authPage/login"
import SignUp from "./components/Pages/authPage/signup"
import Profile from "./components/Pages/ProfilePage/profile"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify"

import FetchDataComponent from "./components/utils/getdata"

import Home_Page from "./components/Pages/HomePage/Home_Page"
import Heatmap from './components/Pages/HeatmapPage/heatmap';
import StockPage from './components/Pages/StockPage/StockPage';
import BacktestInputs from './components/Pages/BacktestPage/BacktestInputs';
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
                <Route path="/stockPage" element={<StockPage/>} />
                <Route path="/backtest-input" element={<BacktestInputs/>} />




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
