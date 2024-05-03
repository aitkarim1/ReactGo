import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch("http://127.0.0.1:4000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
            })
            const data = await response.json();

            console.log({email, password})
            if(response.ok) {
                console.log(data.name)
                props.setName(data.name)
                setRedirect(true)
            } else {
                console.log(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (redirect) {
            navigate("/")
        }
    }, [redirect])

  return (
    <div className="form-signin w-100 m-auto">
        <Form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <Form.Group className="mb-3" controlId="Email">
                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
            </Form.Group>

            <Button variant="primary" type="submit">Sign in</Button>
        </Form>
    </div>
  )
}

export default Login