import React, {useState} from 'react';
import {Cart} from "../store/cart-store";
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { axios } from '../axios';
import {Typography} from "../Typography";

export const OrderPage = observer((props) => {
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [postalCode, setPostalCode] = useState(undefined);
    const [city, setCity] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);

    const handleOrder = async () => {
        const buyer = localStorage.getItem('userId');

        await axios.post('/orders', { firstName, lastName, items: toJS(Cart.cartItems), address, postalCode, city, phoneNumber, totalCost: Cart.totalCost, buyer });

        Cart.emptyCart();
        props.history.push('/congratulate');
    }

    return (
        <div className="container d-flex flex-row">
            <div className="w-50 p-5">
                <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0' }}>
                    <Typography>Podaci o kupcu</Typography>
                </div>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                        <Typography fontWeight={400} fontSize={16}>Ime</Typography>
                    </label>
                    <input type="email" className="form-control" id="nameInput" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surnameInput" className="form-label">
                        <Typography fontWeight={400} fontSize={16}>Prezime</Typography>
                    </label>
                    <input type="text" className="form-control" id="surnameInput" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">
                        <Typography fontWeight={400} fontSize={16}>Adresa</Typography>
                    </label>
                    <input type="text" className="form-control" id="addressInput" value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="postalCodeInput" className="form-label">
                        <Typography fontWeight={400} fontSize={16}>Poštanski broj</Typography>
                    </label>
                    <input type="text" className="form-control" id="postalCodeInput" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label">
                        <Typography fontWeight={400} fontSize={16}>Grad</Typography>
                    </label>
                    <input type="text" className="form-control" id="cityInput" value={city} onChange={(event) => setCity(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneInput" className="form-label">
                        <Typography fontWeight={400} fontSize={16}>Telefon</Typography>
                    </label>
                    <input type="text" className="form-control" id="phoneInput" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                </div>
            </div>
            <div className="w-50 p-5">
                <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0' }}><Typography>Podaci za dostavu</Typography></div>
                {Cart.cartItems.map(cartItem => (
                    <div className="d-flex flex-row pb-3">
                        <img
                            src={cartItem?.imageUrl}
                            alt="Card image cap"
                            style={{ width: 100, height: 100, borderRadius: 5 }}
                        />
                        <div
                            style={{ marginLeft: 50, width: '100%' }}
                        >
                            <div className="d-flex flex-row justify-content-between p-2" style={{ borderBottom: '1px solid #f4f4f4' }}>
                                {/*<div style={{ fontSize: 16, fontWeight: 'bold', height: 'auto' }}>{cartItem?.name}</div>*/}
                                <div><Typography>{cartItem?.name}</Typography></div>
                                <div style={{ marginLeft: 100 }}>
                                    <Typography>{`${cartItem?.price},00kn`}</Typography>
                                </div>
                            </div>
                            <div className="d-flex flex-row p-2">
                                <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                                    <Typography>{`Quantity: ${cartItem?.quantity}`}</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    className="d-flex flex-column p-4"
                    style={{ border: '1px solid #f4f4f4', borderRadius: 2 }}
                >
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Placanje pouzecem" />
                    </Form.Group>
                </div>
                <div className="d-flex flex-row justify-content-between mt-1">
                    <Typography fontSize={16}>Cijena</Typography>
                    <Typography fontSize={16}>{`${Cart.totalCost},00kn`}</Typography>
                </div>
                <div className="d-flex flex-row justify-content-between mt-1">
                    <Typography fontSize={16}>Postarina</Typography>
                    <Typography fontSize={16}>Besplatno</Typography>
                </div>
                <div className="d-flex flex-row justify-content-between mt-1">
                    <Typography fontSize={16}>Ukupno</Typography>
                    <Typography fontSize={16}>{`${Cart.totalCost},00kn`}</Typography>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-2" onClick={handleOrder} style={{ backgroundColor: '#b29e99', border: '1px solid white'  }}>Naruci</button>
            </div>
        </div>
    );
})
