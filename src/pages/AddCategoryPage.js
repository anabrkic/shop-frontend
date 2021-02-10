import React, {useState} from "react";
import {axios} from "../axios";

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
            <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0', fontFamily:"Tahoma", fontSize: 24 }}>Kategorija</div>
            <div className="mb-3">
                <label htmlFor="nameInput" className="form-label" style={{ fontFamily:"Tahoma" }}>Ime</label>
                <input type="text" className="form-control" id="nameInput" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-dark" style={{ marginTop: 10, fontFamily: "Tahoma" }} onClick={handleAddCategory}>Spremi</button>
        </div>
    )
}
