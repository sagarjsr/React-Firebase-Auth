import React, { Fragment, useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const Signin = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { sigIn } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('')
            setLoading(true);
            console.log('hsjsj')
            await sigIn(emailRef.current.value, passwordRef.current.value);
            history.push('/')
        } catch {
            setError('Failed to Sign In')
        }
        setLoading(false);
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Login </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </Fragment>
    )
}

export default Signin

