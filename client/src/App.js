import { Routes, Route } from "react-router-dom"
import Home from './page/home'
import Users from './page/Users'
import Añadir from "./page/Añadir";
import Edit from "./page/Edit";
import Eleminar from "./page/Eleminar";
import Login from "./page/Login";
import Register from "./page/Register";
import axios from "axios"
import { useEffect, useState } from "react";
import Header from "./compenents/header";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [name, setName] = useState("")

  useEffect(() => {
    (
      async () => {
      try {
          let response = await axios.get("http://localhost:4000/UserCheck", {
            withCredentials: true
          })
          
          console.log(name)
          setName(response.data.name)
          
          console.log("success")
          console.log(name)
      } catch(err) {
          console.log(err.response.data.msg)
          console.log("erorrrr")
      }
      }
    )()
  }, [])
  
  return (
    <BrowserRouter>
      <Header name={name} setName={setName}/>
      <Routes>
        <Route path="/" element= {<Home  />}/>
        <Route path="/user/:id" element= {<Users/>}/>
        <Route path="/add" element= {<Añadir/>}/>
        <Route path="/edit/:id" element= {<Edit/>}/>
        <Route path="/Eleminar/:id" element= {<Eleminar/>}/>
        <Route path="/login" element= {<Login setName={setName} />}/>
        <Route path="/register" element= {<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
