import React, { useState } from 'react';
import axios from 'axios';
import {useEffectAsync} from "../useEffectAsync";
import { observer } from "mobx-react-lite"
import {Cart} from "../store/cart-store";

export const CartPage = observer(({ history }) => {
    const id = localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);

    useEffectAsync(async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/cart/${id}`);
            let cartItems = data[0]?.cartItems;
            let i = 0;
            for (const item of cartItems) {
                const { data } = await axios.get(`http://localhost:4000/products/${item?.productId}`);
                cartItems[i] = { ...cartItems[i], name: data[0]?.name, price: data[0]?.price };
                i++;
            }
            setCartItems(cartItems);
        } catch(err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-center" style={{ padding: '50px 0' }}>Kosarica</div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Proizvod</th>
                    <th scope="col">Cijena</th>
                    <th scope="col">Kolicina</th>
                    <th scope="col">Ukupno</th>
                </tr>
                </thead>
                <tbody>
                {Cart.cartItems.map(item => (
                    <ItemRow name={item.name} price={item.price} quantity={item.quantity} id={item._id}/>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <button className="btn btn-secondary mx-2" onClick={() => history.push('/products')}>Nastavi s kupnjom</button>
                <button className="btn btn-primary" onClick={() => history.push('/order')} disabled={Cart.cartItems.length === 0}>Naplata</button>
            </div>
        </div>
    );
});

const ItemRow = observer(({ name, price, quantity, id }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{`${price}kn`}</td>
            <td>
                <div className="d-flex">
                    <button className="btn btn-secondary" onClick={() => Cart.decreaseItemCount(id)} style={{ width: 50 }}>-</button>
                    <input className="mx-2" value={quantity} style={{ width: 100 }}/>
                    <button className="btn btn-primary" onClick={() => Cart.increaseItemCount(id)} style={{ width: 50 }}>+</button>
                </div>
            </td>
            <td>{`${price*quantity}kn`}</td>
        </tr>
    )
});
