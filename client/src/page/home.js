import { useEffect, useState } from 'react';
import '../App.css';
import { Col, Container, Row } from "react-bootstrap"
import axios from "axios"
import Users from './Users';
import { Link } from 'react-router-dom';
import Header from '../compenents/header'
import Eleminar from './Eleminar';

const Home = () => {
    const [apiData, setApiData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let fetchData = async () => {
        try {
            let response = await axios.get("http://localhost:4000")
            
            setApiData(response?.data)
            
            setLoading(false)
        } catch(err) {
            setLoading(false)
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
            <div><Link to={`/add`}><button type="button" className="btn btn-primary">Añadir usuario</button></Link></div>
            {
            apiData.map((data, index) => (
                <Col key={index} className='border border-primary m-3 p-2 col-6 col-sm-3'>
                    <Link to={`/user/${data.id}`} style={{textDecoration: 'none', color: 'inherit'}}><div> <b>Nombre usuario:</b> { data.name } </div>
                    <div><b>Correo:</b> { data.email }</div></Link><br/>
                    <div className='d-flex'><Link to={`/edit/${data.id}`}><button type="button" className="btn btn-info ">Modificar</button></Link>
                    <Eleminar id={data.id} />
                    </div>
                </Col>
            ))
            }
        </Row>
        </Container>
    )
}
export default Home