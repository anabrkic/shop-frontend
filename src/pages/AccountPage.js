import React, {useState} from 'react';
import { ReactComponent as PersonIcon } from '../assets/person-square.svg';
import {useEffectAsync} from "../useEffectAsync";
import { axios } from '../axios';

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
            <PersonIcon width="100px" height="100px" color="gray"/>
            <div className="col-xs-2 col-lg-3 mb-3">
                <label htmlFor="emailInput" className="form-label" Style="font-family: Tahoma">Email</label>
                <input type="email" className="form-control" id="emailInput" Style="font-family: Tahoma" value={userData.email} onChange={(event) => handleChange(event, 'email')} />
            </div>
            <div className="col-xs-2 col-lg-3 mb-3">
                <label htmlFor="firstNameInput" className="form-label" Style="font-family: Tahoma">Ime</label>
                <input type="text" className="form-control" id="firstNameInput" Style="font-family: Tahoma" value={userData.firstName} onChange={(event) => handleChange(event, 'firstName')} />
            </div>
            <div className="col-xs-2 col-lg-3 mb-3">
                <label htmlFor="lastNameInput" className="form-label" Style="font-family: Tahoma" >Prezime</label>
                <input type="text" className="form-control" id="lastNameInput" Style="font-family: Tahoma" value={userData.lastName} onChange={(event) => handleChange(event, 'lastName')} />
            </div>
            <button type="submit" className="btn btn-outline-secondary mt-2" Style="font-family:Tahoma;" onClick={handleSubmit}>Pohrani podatke</button>
        </div>
    );
}
