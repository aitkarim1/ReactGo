import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch("http://127.0.0.1:4000/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name,
                email,
                password
            })
            })
            const data = await response.json();

            if(response.ok) {
                setRedirect(true)
                console.log("success")
            } else {
                console.log(data.msg)
                alert(data.msg)
            }
        } catch (error) {
            console.log(error);
        } 
    }
    useEffect(() => {
        if (redirect) {
            navigate("/login")
        }
    }, [redirect])


  return (
    <div className="form-signin w-100 m-auto">
        <Form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Control type="text" placeholder="Name" onChange={e => setName(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
            </Form.Group>

            <Button variant="primary" type="submit">Sign up</Button>
        </Form>
    </div>
  )
}

export default Register