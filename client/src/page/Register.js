import React, { useState } from 'react'
import { Container, Form, Button, Modal } from 'react-bootstrap'
import Header from '../compenents/header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
        try {
            await axios.post("http://localhost:4000/register", {
                name: name,
                email: email,
                password: password
            });
            
            setShowConfirmation(true)
        } catch (err) {
            console.log(err);
        }
  };

  const handleClose = () => {
    setShowConfirmation(false)
    navigate("/login")
  }
  if(showConfirmation) {
    setTimeout(() => {
      setShowConfirmation(false)
      navigate("/login")
    }, 3000);
  }

  return (
    <Container>
      <div className="form-signin d-flex justify-content-center">
        <Form onSubmit={submitData} className='form'>
            <h1 className="h3 mb-4 text-center ">Registrate</h1>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Control type="text" placeholder="Name" onChange={e =>{setName(e.target.value)}} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
                <Form.Control type="email" placeholder="Enter email" onChange={e =>{setEmail(e.target.value)}} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control type="password" placeholder="Password" onChange={e =>{setPassword(e.target.value)}} required/>
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button variant="primary" type="submit">Entrar</Button>
            </div>
        </Form>

        <Modal show={showConfirmation} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Creacion exitosa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              El usuario ha sido creado.
          </Modal.Body>
          <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                  Cerrar
              </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  )
}

export default Register