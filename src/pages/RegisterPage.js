import React, { useState } from 'react';
import axios from 'axios';

export const RegisterPage = (props) => {
    const [email, setEmail] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:4000/signup', { email, firstName, lastName, password }, { headers: { 'Content-Type': 'application/json' } });
            if (response.data._id !== null) {
                alert('Korisnik uspjesno registriran!');
                props.history.push('/products');
            }
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center" style={{ padding: '50px 0' }}>Registracija</div>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email</label>
                <input type="email" className="form-control" id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Ime</label>
                <input className="form-control" id="passwordInput" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Prezime</label>
                <input className="form-control" id="passwordInput" value={lastName} onChange={(event) => setLastName(event.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Lozinka</label>
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSignup}>Registracija</button>
        </div>
    )
}
