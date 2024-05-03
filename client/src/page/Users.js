import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Header from '../compenents/header'
import * as THREE from 'three';
import * as OBC from 'openbim-components';

const Users = () => {
    const params = useParams();
    const [fragmentIfcLoader, setFragmentIfcLoader] = useState(null);
    const [loaderReady, setLoaderReady] = useState(false);

    useEffect(() => {
        async function initIFCLoader() {
            const container = document.getElementById('container');
            if (!container) {
                console.error('El contenedor no existe en el DOM');
                return;
            }
    
            const components = new OBC.Components();
            components.scene = new OBC.SimpleScene(components);
            components.renderer = new OBC.SimpleRenderer(components, container);
            components.camera = new OBC.SimpleCamera(components);
            components.raycaster = new OBC.SimpleRaycaster(components);
            components.init();
    
            let loader = new OBC.FragmentIfcLoader(components);
            await loader.setup();
    
            console.log(loader); // Verifica los métodos disponibles
            setFragmentIfcLoader(loader);
            setLoaderReady(true); // Actualiza el estado aquí
        }
    
        initIFCLoader();
    }, []);

    useEffect(() => {
        if (loaderReady) { // Cambia la condición a la nueva variable de estado
            descargarYVisualizar();
        }
    }, [loaderReady, fragmentIfcLoader]); // Añade loaderReady a las dependencias

    const descargarYVisualizar = async () => {
        try {
            const response = await axios.get("http://localhost:4000/download", {
                responseType: 'arraybuffer',
            });
            visualizarIFC(response.data);
        } catch (err) {
            console.error('Error al descargar el archivo:', err);
        }
    };

    const visualizarIFC = (buffer) => {
        if (!fragmentIfcLoader || typeof fragmentIfcLoader.loadFromURL !== 'function') {
            console.error('fragmentIfcLoader no está definido o loadFromURL no es una función');
            return;
        }
    
        const fileBlob = new Blob([buffer]);
        const url = URL.createObjectURL(fileBlob);
        fragmentIfcLoader.loadFromURL(url);
        URL.revokeObjectURL(url);
    };
    
    

    // Additional useEffect for fetching user data if necessary
    useEffect(() => {
        // Fetch logic here
    }, [params.id]);

  return (
   <> <Container>
        <Row>
            <Col className='d-flex flex-column align-items-center'>
                {/* <div>
                    <div>User: <h1>{apiData.name}</h1></div>
                    <div>Email: <h1>{apiData.email}</h1></div>
                    {apiData && apiData.file && (
                        <div><img src={"http://localhost:4000" + (apiData.file.startsWith('.') ? apiData.file.slice(1) : apiData.file)} alt="imagen" />
                        
                        <button type='button' onClick={descargar}>descargar</button></div>
                    )}

                </div> */}
            </Col>
        </Row>
    </Container>
    <div id='container' style={{width:"", height:'700px'}}></div>
    </>
  )
}

export default Users