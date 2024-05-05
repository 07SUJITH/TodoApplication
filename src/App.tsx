import './App.css'
import { BrowserRouter as Router ,Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"
import TodoDashboard from "./components/TodoDashboard/TodoDashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/todo" element={<TodoDashboard/>}> </Route>
      </Routes>
    </Router>
  )
}

export default App
