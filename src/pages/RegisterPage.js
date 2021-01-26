import React, { useState } from 'react';
import { axios } from '../axios';

export const RegisterPage = ({ history }) => {
    const [email, setEmail] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const handleSignup = async () => {
        try {
            const response = await axios.post('/signup', { email, firstName, lastName, password }, { headers: { 'Content-Type': 'application/json' } });
            const id = response.data?.user._id;
            const token = response.data?.token;
            const role = response.data?.user?.role;
            localStorage.setItem('userId', id);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            alert('Korisnik uspjesno registriran!');
            history.push('/');
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
            <div className="d-flex flex-row mb-3 justify-content-center">
                <div style={{ marginRight: 10 }}>Imate account?</div>
                <a href="#" onClick={() => history.push('/login')}>Logiraj se</a>
            </div>
        </div>
    )
}
