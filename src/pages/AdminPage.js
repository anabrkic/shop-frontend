import React, {useState} from 'react';
import { Route, Switch, useRouteMatch} from 'react-router-dom';
import { useEffectAsync } from "../useEffectAsync";
import { axios } from "../axios";
import { css } from '@emotion/css';
import { AdminOrdersPage } from "./AdminOrdersPage";

export const AdminPage = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" component={UsersPage} />
                <Route exact path="/admin/products" component={ProductsPage} />
                <Route exact path="/admin/products/add" component={AddProductPage} />
                <Route exact path="/admin/orders" component={AdminOrdersPage} />
            </Switch>
        </div>
    )
}

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffectAsync(async () => {
        const response = await axios.get('users');
        setUsers(response.data);
    }, []);

    const handleDelete = async (id) => {
        const response = await axios.delete(`users/${id}`);
        if (response.data === id) {
            window.location.reload(false);
        }
    }

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            <button type="submit" className="btn btn-primary" onClick={() => handleDelete(user.id)}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const ProductsPage = (props) => {
    const [products, setProducts] = useState([]);

    useEffectAsync(async () => {
        const response = await axios.get('products');
        setProducts(response.data);
    }, []);

    const handleDelete = async (id) => {
        const response = await axios.delete(`products/${id}`);
        if (response.data === id) {
            window.location.reload(false);
        }
    }

    const handleAddProduct = async () => {
        props.history.push('/admin/products/add');
    }

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Material</th>
                    <th scope="col">Price</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {products.map((user, index) => (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.material}</td>
                        <td>{`${user.price},00 kn`}</td>
                        <td>
                            <button type="submit" className="btn btn-primary" onClick={() => handleDelete(user._id)}>
                                X
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button type="submit" className="btn btn-primary" onClick={handleAddProduct}>
                Dodaj proizvod
            </button>
        </div>
    );
}

const selectStyle = css`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: .25rem;
`;

const AddProductPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [imageUrl, setImageUrl] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [material, setMaterial] = useState(undefined);
    const [categoryId, setCategoryId] = useState("");

    useEffectAsync(async () => {
        const categoriesResponse = await axios.get('categories');
        setCategories(categoriesResponse.data);
    }, []);

    const handleAddProduct = async () => {
        try {
            await axios.post('products', { name, price: price?.toString(), imageUrl, material, categoryId, description });
            props.history.push('/admin/products');
            window.location.reload(false);
        } catch(err) {
            alert('Error while adding a new product');
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0' }}>Podaci za dostavu</div>
            <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Ime</label>
                <input type="text" className="form-control" id="nameInput" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="priceInput" className="form-label">Cijena</label>
                <input type="number" className="form-control" id="priceInput" value={price} onChange={(event) => setPrice(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="imageUrlInput" className="form-label">URL Slike</label>
                <input type="text" className="form-control" id="imageUrlInput" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="materialInput" className="form-label">Materijal</label>
                <input type="text" className="form-control" id="materialInput" value={material} onChange={(event) => setMaterial(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="descriptionInput" className="form-label">Opis</label>
                <input type="text" className="form-control" id="descriptionInput" value={description} onChange={(event) => setDescription(event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Kategorija</label>
                <select value={categoryId} name="cars" id="cars" className={selectStyle} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="" disabled>Odaberi kategoriju</option>
                    {categories.map(category => (
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            {/*<Dropdown style={{ marginBottom: 20 }}>*/}
            {/*    <Dropdown.Toggle id="dropdown-basic" variant="secondary">*/}
            {/*        Kategorija*/}
            {/*    </Dropdown.Toggle>*/}
            {/*    <Dropdown.Menu>*/}
            {/*        {categories.map(category => (*/}
            {/*            <Dropdown.Item onClick={() => setActiveCategory(category.name)}>{category.name}</Dropdown.Item>*/}
            {/*        ))}*/}
            {/*    </Dropdown.Menu>*/}
            {/*</Dropdown>*/}
            {/*<div className="mb-3">*/}
            {/*    <input type="text" className="form-control" id="phoneInput" value={activeCategory} />*/}
            {/*</div>*/}
            <button type="submit" className="btn btn-primary" style={{ marginTop: 10 }} onClick={handleAddProduct}>Dodaj proizvod</button>
        </div>
    )
}
