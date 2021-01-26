import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { css } from '@emotion/css';
import {withRouter} from "react-router";

const categoryNameStyle = css`
    border-bottom: 1px solid #f4f4f4;
    padding: 10px 5px;
`;

export const ProductsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [{ data, loading }] = useAxios(
        'http://localhost:4000/categories'
    );
    const [products, setProducts] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState([]);

    useEffect(() => {
        console.log('useEffect');
    });

    if (loading) {
        return null;
    }

    const handleCategoryClick = async (id) => {
        try {
            let response;
            if (id === 0) {
                response = await axios.get('http://localhost:4000/products');
            } else {
                response = await axios.get(`http://localhost:4000/category-products?categoryId=${id}`);
            }
            setProducts(response?.data);
            setActiveCategoryId(id);
        } catch(err) {
            console.error(err);
        }
    }

    const handleFilterChange = async (event) => {
        try {
            const response = await axios.get(`http://localhost:4000/filtered-products?material=${event.target.value}&categoryId=${activeCategoryId}`);
            setProducts(response?.data);
        } catch(err) {
            console.error(err);
        }
    }

    const handleSortChange = async (event) => {
        if (event?.target?.value === 'priceAsc') {
            const productsCopy = [...products];
            productsCopy.sort((a, b) => (a.price - b.price));
            setProducts(productsCopy);
        }
        if (event?.target?.value === 'priceDesc') {
            const productsCopy = [...products];
            productsCopy.sort((a, b) => (b.price - a.price));
            setProducts(productsCopy);
        }
    }

    const productsPerPage = 2;
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container d-flex w-100">
            <div className="d-flex flex-column p-3">
                <Categories categories={[{ _id: 0, name: 'Sve' }].concat(data)} onCategoryClick={handleCategoryClick}/>
            </div>
            <div>
                <div className="p-4">
                    <div className="d-flex flex-row">
                        <select className="form-select" style={{ width: '30%', marginRight: 10 }} onChange={handleFilterChange}>
                            <option value="" disabled selected hidden>Filter</option>
                            <option value="all">Sve</option>
                            <option value="gold">Zlato</option>
                            <option value="silver">Srebro</option>
                        </select>
                        <select className="form-select" style={{ width: '30%' }} onChange={handleSortChange}>
                            <option value="" disabled selected hidden>Sort</option>
                            <option value="priceAsc">Cijena, niska prema visokoj</option>
                            <option value="priceDesc">Cijena, visoka prema niskoj</option><option value="bestSelling">Najprodavanije</option>
                        </select>
                    </div>
                </div>
                {currentProducts?.length === 0 && <div className="p-3">Nema proizvoda</div>}
                {currentProducts?.length > 0 && (
                    <div className="d-flex flex-wrap p-3 w-100">
                        {currentProducts.map(product => <Card product={product} />)}
                    </div>
                )}
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li className={`page-item ${currentPage === number ? 'active' : 'none'}`}><a className="page-link" href="#" onClick={() => setCurrentPage(number)}>{number}</a></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const Categories = ({ categories, onCategoryClick }) => {
    return (
        <>
            {categories.map(category => (
                <div
                    className={categoryNameStyle}
                    onClick={() => onCategoryClick(category._id)}
                    style={{ cursor: 'pointer' }}
                >
                    {category.name}
                </div>
            ))}
        </>
    )
}

const Card = withRouter(({ history, product }) => {
    return (
        <div style={{ width: '33%', padding: 10 }}>
            <div className="card">
                <img className="card-img-top" src={product?.imageUrl} alt="Card image cap" style={{ height: 300, width: '100%' }} />
                <div className="card-body">
                    <h5 className="card-title">{product?.name}</h5>
                    <p className="card-text">{product?.description}</p>
                    <div className="d-flex flex-row justify-content-between">
                        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#535353' }}>{`${product?.price},00kn`}</div>
                        <a href="#" className="btn btn-primary" onClick={() => history.push(`/product/${product?._id}`)}>Kupi</a>
                    </div>
                </div>
            </div>
        </div>
    );
});
