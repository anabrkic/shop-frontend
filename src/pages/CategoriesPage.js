import React, {useState} from "react";
import {useEffectAsync} from "../useEffectAsync";
import {axios} from "../axios";

export const CategoriesPage = ({ history }) => {
    const [categories, setCategories] = useState([]);

    useEffectAsync(async () => {
        const response = await axios.get('categories');
        console.log('CATEGORIES', response);
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
                <thead Style="font-family: Tahoma; color: gray">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category, index) => (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{category.name}</td>
                        <td>
                            <button type="submit" className="btn btn-danger" onClick={() => handleDelete(category._id)}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button type="submit" className="btn btn-dark" style={{ fontFamily: "Tahoma" }} onClick={handleAddCategory}>
                Dodaj kategoriju
            </button>
        </div>
    );
}
