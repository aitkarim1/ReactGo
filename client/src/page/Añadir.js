import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap'
import Header from '../compenents/header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Añadir = () => {

    const [usuario, setUsuario] = useState("")
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [file, setFile] = useState("")
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate()
    
    let fetchData = async () => {
        try {
        const formData = new FormData();
        formData.append('name', usuario);
        formData.append('email', correo);
        formData.append('password', password);
        formData.append('file', file[0]);

        console.log(formData)

        let response = await axios.post("http://localhost:4000/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        navigate("/")
            
        } catch(err) {
            console.log(err)
        }
    }

    const checkForm = async (e) => {
        e.preventDefault(); // Evitar de que se carge la pagina
    
        if (usuario !== "" && correo !== "" && password !== "") {
          await fetchData();
        } else {
          setShowAlert(true);
        }
      };


  return (
    <Container>

        {showAlert ?
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        completa todos los campos.
        </Alert> : ""
        }
        
        <form onSubmit={checkForm}>
            <div className="mb-3">
                <label className="form-label">Usuario:</label>
                <input type="text" className="form-control w-25" id="usuario"  onChange={e => setUsuario(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Correo:</label>
                <input type="text" className="form-control w-25" id="Correo" onChange={e => setCorreo(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label  className="form-label">Password:</label>
                <input type="password" className="form-control w-25" id="password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Fichero</Form.Label>
                <Form.Control type="file" className='w-25' onChange={e => setFile(e.target.files)}/>
            </Form.Group>
            <button type="submit" className="btn btn-primary">Añadir</button>
        </form>
    </Container>
  )
}

export default Añadir