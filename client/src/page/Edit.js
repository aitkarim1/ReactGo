import React, { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import Header from '../compenents/header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/" + params.id);
                setUsuario(response.data.name);
                setCorreo(response.data.email);
                setPassword(response.data.password);
            } catch(err) {
                console.log(err.response);
            }
        };
        fetchData();
    }, [params.id]);
    
    const submitData = async (e) => {
        e.preventDefault();
        if (usuario !== "" && correo !== "" && password !== "") {
            try {
                await axios.put("http://localhost:4000/" + params.id, {
                    name: usuario,
                    email: correo,
                    password: password
                });
                setShowConfirmation(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            setShowAlert(true);
        }
    };

    const handleClose = () => {
        setShowConfirmation(false);
        navigate("/");
    };

    return (
        <Container>
            {showAlert &&
                <div className="alert alert-danger" role="alert">
                    Completa todos los campos.
                </div>
            }
            <form onSubmit={submitData}>
                <div className="mb-3">
                    <label className="form-label">Usuario:</label>
                    <input type="text" className="form-control w-25" id="usuario" value={usuario} onChange={e => setUsuario(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo:</label>
                    <input type="text" className="form-control w-25" id="correo" value={correo} onChange={e => setCorreo(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control w-25" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <Button variant="primary" type="submit">Modificar</Button>
            </form>
            <Modal show={showConfirmation} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificación exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Los datos han sido modificados.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Edit;
