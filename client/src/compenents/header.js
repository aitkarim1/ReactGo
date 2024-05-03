import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from "axios"

const Header = ({name, setName}) => {

  const logout = async () => {
    try {
      let response = await axios.post("http://localhost:4000/logout", {
        withCredentials: true
      })
        
      setName("")
      console.log(response.data.msg)
    }catch(err) {
      console.log("erorrrr logout")
    }
  }

  let menu

  if(name === "" || name === undefined || name === null) {
    menu = (
      <header className='mb-3'>
        <Container fluid className='p-3'>
            <h1 className='text-center'>React & Go</h1>
        </Container>
        <Navbar data-bs-theme="black">
        <Container className=" border border-bottom-0 border-start-0 border-end-0 border-dark">
          <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to={"/login"} >Login</Nav.Link>
            <Nav.Link as={Link} to={"/register"} >Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </header>
    )
  } else {
    menu = (
      <header className='mb-3'>
        <Container fluid className='p-3'>
            <h1 className='text-center'>React & Go</h1>
        </Container>
        <Navbar data-bs-theme="black">
        <Container className=" border border-bottom-0 border-start-0 border-end-0 border-dark">
          <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to={"/login"} onClick={logout} >Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </header>
    )
  }

  return (
    <div>
      {menu}
    </div>
  )
}

export default Header