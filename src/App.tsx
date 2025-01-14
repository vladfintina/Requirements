import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { LoginPage } from './authenticationPages/LoginPage/LoginPage';
import { RegisterPage } from './authenticationPages/RegisterPage/RegisterPage';


function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<div>Main Page</div>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
    </Routes>
</BrowserRouter>
  )
}

export default App
