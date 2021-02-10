import React, {useEffect} from 'react';
import useAxios from 'axios-hooks';
import axios from "axios";
import {Cart} from "../store/cart-store";

export const SingleProductPage = ({ match, history }) => {
    const [{ data, loading }] = useAxios(`http://localhost:4000/products/${match.params.id}`);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        console.log('id', id);
    }, []);

    if (loading) {
        return null;
    }

    const product = data[0] || undefined;

    // useEffectAsync(async () => {
    //     try {
    //         const productId = match.params.id;
    //         const product = await axios.get(`http://localhost:4000/products/${productId}`)
    //     } catch(err) {
    //         console.error(err);
    //     }
    // })

    const handleAddToCart = async () => {
        const buyer = localStorage.getItem('userId');
        Cart.addToCart({ ...product, quantity: 1 });
        try {
            const response = await axios.post('http://localhost:4000/cart', {
                buyer,
                quantity: 1,
                id: match.params.id,
            });
        } catch(err) {
            console.error(err);
        }
        history.push('/cart');
    }

    const loggedIn = !!localStorage.getItem('userId');

    return (
        <div className="container" style={{ paddingTop: 50 }}>
            <div className="d-flex flex-row">
                <img
                    src={product?.imageUrl}
                    alt="Card image cap"
                    style={{ width: '50%' }}
                />
                <div
                    className="d-flex flex-column p-4 justify-content-between"
                    style={{ width: '50%', marginLeft: 50, border: '1px solid #f4f4f4', borderRadius: 2 }}
                >
                    <div>
                        <div className="d-flex flex-row justify-content-between p-3" style={{ borderBottom: '1px solid #f4f4f4' }}>
                            <div style={{ fontSize: 24 }}>Naziv proizvoda</div>
                            <div style={{ fontSize: 24, fontWeight: 'bold', height: 'auto' }}>{product?.name}</div>
                        </div>
                        <div className="d-flex flex-row justify-content-between p-3" style={{ borderBottom: '1px solid #f4f4f4' }}>
                            <div style={{ fontSize: 24 }}>Opis proizvoda</div>
                            <div style={{ fontSize: 24, fontWeight: 'bold', height: 'auto' }}>{product?.description}</div>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between mt-3">
                        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#535353' }}>{`${product?.price},00kn`}</div>
                        <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: '35%' }} disabled={!loggedIn}>Dodaj u kosaricu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
