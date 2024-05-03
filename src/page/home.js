import { useEffect, useState } from 'react';
import '../App.css';
import { Col, Container, Row } from "react-bootstrap"
import axios from "axios"
import Users from './Users';
import { Link } from 'react-router-dom';

const Home = () => {
    const [apiData, setApiData] = useState([])
    useEffect(() => {
        let fetchData = async () => {
        try {
            let response = await axios.get("http://localhost:4000")
            
            setApiData(response?.data)
            
        } catch(err) {
            console.log(err.response)
        }
        }
    
        fetchData()
    
        return () => {
        }
    }, [])
    
    console.log(apiData)

    return(
        <Container>
        <Row>
            <Col xs="12" className='mb-3'>
            <h1 className='text-center'>React & Go</h1>
            </Col>
            {
            apiData.map((data, index) => (
                <Col key={index} className='border border-primary m-3 p-2'>
                    <div><Link to={`/${data.id}`}> <b>Nombre usuario:</b> { data.name } </Link></div>
                    <div><b>Correo:</b> { data.email }</div>
                </Col>
            ))
            }
        </Row>
        </Container>
    )
}
export default Home