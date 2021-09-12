import React, {useState} from "react";
import {axios} from "../axios";
import {white} from "../colors";
import {Typography} from "../Typography";

export const AddCategoryPage = (props) => {
    const [name, setName] = useState(undefined);

    const handleAddCategory = async () => {
        try {
            await axios.post('categories', { name });
            props.history.push('/admin/categories');
            window.location.reload(false);
        } catch(err) {
            alert('Error while adding a new category');
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0' }}><Typography fontWeight={600} fontSize={24} color={white}>Kategorija</Typography></div>
            <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                    <Typography fontWeight={400} fontSize={16} color={white}>Ime</Typography>
                </label>
                <input type="text" className="form-control" id="nameInput" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }} onClick={handleAddCategory} style={{ backgroundColor: '#b29e99', borderColor: white, marginBottom: 50 }}>Dodaj kategoriju</button>
        </div>
    )
}
