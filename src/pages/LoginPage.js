import React, { useState } from 'react';
import { axios } from '../axios';
import { Typography } from "../Typography";
import { white } from "../colors";

export const LoginPage = ({ history }) => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const handleLogin = async () => {
        try {
            const response = await axios.post('login', { email, password });
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
        <div className="container" style={{ minWidth: 350, maxWidth: 800, marginTop: 80, marginBottom: 80 }}>
            <div className="d-flex justify-content-center titleStyle">
                <Typography fontWeight={600} fontSize={24} color={white}>Prijava</Typography>
            </div>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                    <Typography fontWeight={400} fontSize={16} color={white}>Email</Typography>
                </label>
                <input type="email" className="form-control" id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                    <Typography fontWeight={400} fontSize={16} color={white}>Lozinka</Typography>
                </label>
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleLogin} style={{ width: '100%', border: '1px solid white', backgroundColor: '#b29e99', marginTop: 24, marginBottom: 24 }}>Prijava</button>
            <div className="d-flex flex-row mb-3 justify-content-center" style={{ marginBottom: 64 }}>
                <div style={{ marginRight: 10 }}>Nemate account?</div>
                <a href="#" onClick={() => history.push('/register')} style={{ color: white }}>Registriraj se</a>
            </div>
        </div>
    )
}
