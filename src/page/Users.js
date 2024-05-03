import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Users = () => {
    const params = useParams()

    console.log(params)

    const [apiData, setApiData] = useState([])
    useEffect(() => {
        let fetchData = async () => {
        try {
            let response = await axios.get("http://localhost:4000"+ "/" + params.id)
            
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

  return (
    <Container>
        <Row>
            <Col>
                <div>User: <h1>{apiData.name}</h1></div>
                <div>Email: <h1>{apiData.email}</h1></div>
            </Col>
        </Row>
    </Container>
  )
}

export default Users