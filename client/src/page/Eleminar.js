import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../compenents/header';

const Eleminar = (id) => {
    const navigate = useNavigate();
    const params = useParams();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            let response = await axios.delete("http://localhost:4000/Eleminar/" + id.id)
            window.location.reload();
        } catch(e) {
            console.log(e)
        }
    }

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    
  return (
    <Container>
      <div>
            <Button variant="danger" onClick={handleShowModal}>
                Eliminar
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </Container>
  )
}

export default Eleminar