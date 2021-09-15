import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { css } from '@emotion/css';
import {withRouter} from "react-router";
import {useEffectAsync} from "../useEffectAsync";
import {Typography} from "../Typography";
import {white} from "../colors";

const categoryNameStyle = css`
    border-bottom: 1px solid #f4f4f4;
    padding: 10px 5px;
`;

export const ProductsPage = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // const [{ data, loading }] = useAxios(
    //     'http://localhost:4000/categories'
    // );
    const [products, setProducts] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState([]);

    // if (loading) {
    //     return null;
    // }

    useEffectAsync(async () => {
        const { id } = match.params;
        let response;
        if (id === "0") {
            response = await axios.get('http://localhost:4000/products');
        } else {
            response = await axios.get(`http://localhost:4000/category-products?categoryId=${id}`);
        }
        setProducts(response?.data);
    }, [match]);

    // const handleCategoryClick = async (id) => {
    //     try {
    //         let response;
    //         if (id === 0) {
    //             response = await axios.get('http://localhost:4000/products');
    //         } else {
    //             response = await axios.get(`http://localhost:4000/category-products?categoryId=${id}`);
    //         }
    //         setProducts(response?.data);
    //         setActiveCategoryId(id);
    //     } catch(err) {
    //         console.error(err);
    //     }
    // }

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

    const productsPerPage = 4;
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container d-flex w-100">
            <div style={{ width: '100%' }}>
                <div className="p-4">
                    <div className="d-flex flex-row">
                        <select className="form-select" style={{ width: '10%', marginRight: 10 }} onChange={handleFilterChange}>
                            <option value="" disabled selected hidden>Filter</option>
                            <option value="all">Sve</option>
                            <option value="gold">Zlato</option>
                            <option value="silver">Srebro</option>
                        </select>
                        <select className="form-select" style={{ width: '10%' }} onChange={handleSortChange}>
                            <option value="" disabled selected hidden>Sort</option>
                            <option value="priceAsc">Cijena, niska prema visokoj</option>
                            <option value="priceDesc">Cijena, visoka prema niskoj</option><option value="bestSelling">Najprodavanije</option>
                        </select>
                    </div>
                </div>
                {currentProducts?.length === 0 && <div className="p-3">Nema proizvoda</div>}
                {currentProducts?.length > 0 && (
                    <div className="d-flex flex-wrap p-3 w-100">
                        {currentProducts.map(product => <Card2 product={product} />)}
                    </div>
                )}
                <ul className="pagination justify-content-center" style={{ marginBottom: 64 }}>
                    {pageNumbers.map(number => (
                        <li style={{ cursor: 'pointer'}} className={`page-item ${currentPage === number ? 'active' : 'none'}`} onClick={() => {
                            setCurrentPage(number)
                        }}>
                            <a
                                className="page-link"
                                style={currentPage === number ? { backgroundColor: 'lightgrey', border: '1px solid grey', color: 'black' } : { backgroundColor: 'white', border: '1px solid grey', color: 'black' }}
                                >
                                    {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const Card2 = withRouter(({ history, product }) => {
   return (
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginBottom: 32 }} onClick={() => history.push(`/product/${product?._id}`)}>
           <img src={product?.imageUrl} alt="Card image cap" style={{ marginBottom: 16, height: 300, width: 300, borderRadius: 4, filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.1))' }} />
           <Typography fontSize={18} color={white}>{product?.name}</Typography>
           <Typography fontSize={14} color={white}>{product?.description}</Typography>
           <Typography fontSize={14} color={white}>{`${product?.price},00kn`}</Typography>
       </div>
   );
});
