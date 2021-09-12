import React, { useState } from 'react';
import axios from 'axios';
import {useEffectAsync} from "../useEffectAsync";
import { observer } from "mobx-react-lite"
import {Cart} from "../store/cart-store";
import {Typography} from "../Typography";
import {white} from "../colors";

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
                console.log('data', data)
                cartItems[i] = { ...cartItems[i], name: data[0]?.name, price: data[0]?.price, imageUrl: data[0]?.imageUrl };
                i++;
            }
            setCartItems(cartItems);
        } catch(err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="container" style={{ height: 500 }}>
            <div className="d-flex justify-content-center" style={{ padding: '50px 0' }}>
                <Typography fontWeight={600} fontSize={24} color={white}>Kosarica</Typography>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" style={{ borderColor: 'white' }}>
                        <Typography fontWeight={400} fontSize={16} color={white}>Proizvod</Typography>
                    </th>
                    <th scope="col" style={{ borderColor: 'white' }}>
                        <Typography fontWeight={400} fontSize={16} color={white}>Cijena</Typography>
                    </th>
                    <th scope="col" style={{ borderColor: 'white' }}>
                        <Typography fontWeight={400} fontSize={16} color={white}>Količina</Typography>
                    </th>
                    <th scope="col" style={{ borderColor: 'white' }}>
                        <Typography fontWeight={400} fontSize={16} color={white}>Ukupno</Typography>
                    </th>
                </tr>
                </thead>
                <tbody>
                {Cart.cartItems.map(item => (
                    <ItemRow name={item.name} price={item.price} quantity={item.quantity} id={item._id} imageUrl={item.imageUrl}/>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <button className="btn btn-secondary mx-2" onClick={() => history.push('/products')} style={{ width: '20%', backgroundColor: '#b29e99', borderColor: 'white' }}>Nastavi s kupnjom</button>
                <button className="btn btn-primary" onClick={() => history.push('/order')} disabled={Cart.cartItems.length === 0} style={{ width: '20%', backgroundColor: '#b29e99', borderColor: 'white' }}>Naplata</button>
            </div>
        </div>
    );
});

const ItemRow = observer(({ name, price, quantity, id, imageUrl }) => {
    return (
        <tr>
            <td style={{ display: 'flex' }}>
                <img
                    src={imageUrl}
                    alt="image"
                    style={{ width: 80, height: 80, borderRadius: 4, filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.1))' }}
                />
                <div style={{ alignSelf: 'center', paddingLeft: 16 }}>
                    <Typography fontWeight={400} fontSize={16} color={white}>{name}</Typography>
                </div>
            </td>
            <td style={{ verticalAlign: 'middle' }}><Typography fontWeight={400} fontSize={16} color={white}>{`${price}kn`}</Typography></td>
            <td style={{ verticalAlign: 'middle' }}>
                <div className="d-flex">
                    <button className="btn btn-secondary" onClick={() => Cart.decreaseItemCount(id)} style={{ width: 50, backgroundColor: 'transparent', borderColor: 'white' }}>-</button>
                    <input className="mx-2" value={quantity} style={{ width: 100 }}/>
                    <button className="btn btn-primary" onClick={() => Cart.increaseItemCount(id)} style={{ width: 50, backgroundColor: 'transparent', borderColor: 'white' }}>+</button>
                </div>
            </td>
            <td style={{ verticalAlign: 'middle' }}><Typography fontWeight={400} fontSize={16} color={white}>{`${price*quantity}kn`}</Typography></td>
        </tr>
    )
});
