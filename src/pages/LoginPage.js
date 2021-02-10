import React, { useState } from 'react';
import { axios } from '../axios';

export const LoginPage = ({ history }) => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const handleLogin = async () => {
        try {
            const response = await axios.post('login', { email, password });
            console.log('response', response);
            const id = response.data?.user._id;
            const token = response.data?.token;
            const role = response.data?.user?.role;
            localStorage.setItem('userId', id);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            history.push('/');
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0' }}>Prijava</div>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email</label>
                <input type="email" className="form-control" id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Lozinka</label>
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Prijava</button>
        </div>
    )
}
