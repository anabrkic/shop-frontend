import React, {useState} from 'react';
import { ReactComponent as PersonIcon } from '../assets/person-square.svg';
import {useEffectAsync} from "../useEffectAsync";
import { axios } from '../axios';
import {white} from "../colors";
import {Typography} from "../Typography";

export const AccountPage = ({ match, history }) => {
    const [userData, setUserData] = useState({});

    useEffectAsync(async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/users/${match.params.id}`);
            setUserData(data);
        } catch(err) {
            console.error(err);
        }
    }, []);

    const handleChange = (event, key) => {
        const userDataCopy = {...userData};
        userDataCopy[key] = event.target.value;
        setUserData(userDataCopy);
    }

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:4000/users/${match.params.id}`, { ...userData });
            window.location.reload();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="d-flex flex-column align-items-center w-100 mt-5">
            <PersonIcon width="100px" height="100px" style={{ marginBottom: 50 }}/>
            <div className="mb-3 w-50">
                <label htmlFor="emailInput" className="form-label">
                    <Typography fontWeight={400} fontSize={16} color={white}>Email</Typography>
                </label>
                <input type="email" className="form-control" id="emailInput" value={userData.email} onChange={(event) => handleChange(event, 'email')} />
            </div>
            <div className="mb-3 w-50">
                <label htmlFor="firstNameInput" className="form-label">
                    <Typography fontWeight={400} fontSize={16} color={white}>Ime</Typography>
                </label>
                <input type="text" className="form-control" id="firstNameInput" value={userData.firstName} onChange={(event) => handleChange(event, 'firstName')} />
            </div>
            <div className="mb-3 w-50">
                <label htmlFor="lastNameInput" className="form-label">
                    <Typography fontWeight={400} fontSize={16} color={white}>Prezime</Typography>
                </label>
                <input type="text" className="form-control" id="lastNameInput" value={userData.lastName} onChange={(event) => handleChange(event, 'lastName')} />
            </div>
            <button type="submit" className="btn btn-primary w-50 mt-2" onClick={handleSubmit} style={{ width: '100%', border: '1px solid white', backgroundColor: '#b29e99', marginBottom: 50 }}>Pohrani podatke</button>
            {/*<button type="submit" className="btn btn-primary" onClick={handleLogin} style={{ width: '100%', border: '1px solid white', backgroundColor: '#b29e99', marginTop: 24, marginBottom: 24 }}>Prijava</button>*/}
        </div>
    );
}
