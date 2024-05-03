import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navb = ({name, setName}) => {
  const logout = async () => {
    try {
      let response = await fetch("http://127.0.0.1:4000/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
      })
      const data = await response.json();
      console.log(data.msg)
      setName("")
    } catch (error) {
        console.log(error)
    }
  }

  let menu

  if(name === "" || name === undefined) {
    menu = (
      <Container>
        <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
          <Nav.Link as={Link} to={"/register"}>Register</Nav.Link>
        </Nav>
      </Container>
    )
  } else {
    menu = (
      <Container>
        <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to={"/login"} onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    )
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      {menu}
    </Navbar>
  );
};

export default Navb;
