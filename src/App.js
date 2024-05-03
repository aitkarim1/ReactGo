import { Routes, Route } from "react-router-dom"
import Home from './page/home'
import Users from './page/Users'

function App() {
  
  return (
    <Routes>
      <Route path="/" element= {<Home/>}/>
      <Route path="/:id" element= {<Users/>}/>
    </Routes>
  );
}

export default App;
