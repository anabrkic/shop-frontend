import React, {useEffect} from 'react';
import useAxios from 'axios-hooks';
import axios from "axios";
import {Cart} from "../store/cart-store";
import {white} from "../colors";
import {Typography} from "../Typography";

export const SingleProductPage = ({ match, history }) => {
    const [{ data, loading }] = useAxios(`http://localhost:4000/products/${match.params.id}`);

    useEffect(() => {
        const id = localStorage.getItem('userId');
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
        <div className="container">
            <div className="d-flex flex-row" style={{ margin: '48px 0' }}>
                <img
                    src={product?.imageUrl}
                    alt="Card image cap"
                    style={{ width: '50%', borderRadius: 4, filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.1))' }}
                />
                <div
                    className="d-flex flex-column p-4 justify-content-between"
                    style={{ width: '50%', marginLeft: 50, border: '1px solid #f4f4f4', borderRadius: 2 }}
                >
                    <div>
                        <div className="d-flex flex-row justify-content-between p-3" style={{ borderBottom: '1px solid #f4f4f4' }}>
                            <Typography fontSize={24} color={white}>Naziv Proizvoda</Typography>
                            <Typography fontSize={24} color={white}>{product?.name}</Typography>
                        </div>
                        <div className="d-flex flex-row justify-content-between p-3" style={{ borderBottom: '1px solid #f4f4f4' }}>
                            <Typography fontSize={24} color={white}>Opis Proizvoda</Typography>
                            <Typography fontSize={24} color={white}>{product?.description}</Typography>
                        </div>
                        <div className="d-flex flex-row justify-content-between p-3" style={{ borderBottom: '1px solid #f4f4f4' }}>
                            <Typography fontSize={24} color={white}>Cijena</Typography>
                            <Typography fontSize={24} color={white} fontWeight={600}>{`${product?.price},00kn`}</Typography>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end mt-3">
                        <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: '35%', backgroundColor: 'transparent', borderColor: 'white' }} disabled={!loggedIn}>Dodaj u kosaricu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
