import React, { Fragment, useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        setError("");
        try {
            logout();
            history.pushState('/login')
        } catch {
            setError('Failed to log out')
        }
    }
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser.email}
                    <Link to='/update-profile' className="btn btn-primary w-100 mt-3" >update profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Logout</Button>
            </div>
        </Fragment>
    )
}

export default Dashboard
