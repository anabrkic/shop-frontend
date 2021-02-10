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
            <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0', fontFamily: "Tahoma", fontSize: 24 }}>Prijava</div>
            <div className="d-flex flex-wrap p-3 w-100"></div>
            <div className="mb-3 col-lg-5 col-md-6 col-sm-8" Style="margin-left: auto; margin-right:auto">
                <label htmlFor="emailInput" className="form-label" style={{ fontFamily: "Tahoma" }}>Email</label>
                <input type="email" className="form-control" id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3 col-lg-5 col-md-6 col-sm-8" Style="margin-left: auto; margin-right:auto">
                <label htmlFor="passwordInput" className="form-label" style={{ fontFamily: "Tahoma" }}>Lozinka</label>
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-dark" Style="font-family: Tahoma; margin-left:45%" onClick={handleLogin}>Prijava</button>
            <div className="d-flex flex-row mb-3 justify-content-center">
                <div style={{ marginTop: 10, marginRight: 10, fontFamily: "Tahoma" }}>Nemate account?</div>
                <a href="#" onClick={() => history.push('/register')} style={{ fontFamily: "Tahoma", marginTop: 10 }}>Registriraj se</a>
            </div>
            
            
        </div>
    )
}
