import React, { Fragment, useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

const UpdateProfile = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { updatePassword, updateEmail, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }

        const promise = [];
        setError('')
        setLoading(true);
        if (emailRef.current.value !== currentUser.email) {
            promise.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promise.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promise).then(() => {
            history.push('/')
        })
            .catch(() => {
                setError('Failed to update an account')
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required
                                defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}
                                placeholder="leave blank to keep the same " />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="leave blank to keep the same " />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Update </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to='/'>Cancel</Link>
            </div>
        </Fragment>
    )
}

export default UpdateProfile
