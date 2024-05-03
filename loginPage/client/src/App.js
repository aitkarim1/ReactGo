import './App.css';
import Navb from './components/Navb';
import Home from './pages/Home';
import Login from './pages/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState("")

    useEffect(() => {
        (
          async () => {
            try {
              let response = await fetch("http://127.0.0.1:4000/user", {
              headers: {"Content-Type": "application/json"},
              credentials: "include"
              })

              const content = await response.json()

              setName(content.name)
            } catch (error) {
              console.log(error)
            }
          }
        )()
    }, [])

  return (
    <BrowserRouter>
      <Navb name={name} setName={setName} />
      <Routes>
        <Route path='/' element={<Home name={name} />} />
        <Route path='/login' element={<Login setName={setName} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
