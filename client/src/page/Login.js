import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import Header from '../compenents/header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = ({setName}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/login", {
                email: email,
                password: password
            }, {
              withCredentials: true
            });
            setName(response.data.name)
            console.log("success login")
            navigate("/")
        } catch (err) {
            console.log(err.response.data.msg);
            setShowAlert(true);
        }
  };

  if(showAlert) {
    setTimeout(() => {
      setShowAlert(false)
    }, 2500);
  }
  
  return (
    <Container>
      <div className='d-flex justify-content-center'>
        {showAlert &&
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Usuario/Contraseña Incorecto.
          </Alert>
        }
      </div>

      <div className="form-signin d-flex justify-content-center">
        <Form onSubmit={submitData} className='form'>
            <h1 className="h3 mb-4 text-center ">Inicia sesion</h1>
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
      </div>
    </Container>
  )
}

export default Login