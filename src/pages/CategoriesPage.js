import React, {useState} from "react";
import {useEffectAsync} from "../useEffectAsync";
import {axios} from "../axios";
import {Typography} from "../Typography";

export const CategoriesPage = ({ history }) => {
    const [categories, setCategories] = useState([]);

    useEffectAsync(async () => {
        const response = await axios.get('categories');
        setCategories(response.data);
    }, []);

    const handleDelete = async (id) => {
        const response = await axios.delete(`categories/${id}`);
        if (response.data === id) {
            window.location.reload(false);
        }
    }

    const handleAddCategory = () => {
        history.push('/admin/categories/add');
    }

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col"><Typography>#</Typography></th>
                    <th scope="col"><Typography>Name</Typography></th>
                    <th scope="col"><Typography>Izbriši</Typography></th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category, index) => (
                    <tr>
                        <th scope="row"><Typography fontWeight={400} fontSize={16}>{index + 1}</Typography></th>
                        <td><Typography fontWeight={400} fontSize={16}>{category.name}</Typography></td>
                        <td>
                            <button type="submit" className="btn btn-primary" onClick={() => handleDelete(category._id)} style={{ width: 50, backgroundColor: 'transparent', borderColor: 'white' }}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button type="submit" className="btn btn-primary" onClick={handleAddCategory} style={{ width: 200, backgroundColor: '#b29e99', borderColor: 'white', marginBottom: 50 }}>
                Dodaj kategoriju
            </button>
        </div>
    );
}
