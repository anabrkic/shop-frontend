import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { withRouter } from 'react-router';
import { isNil } from 'lodash';

import { ReactComponent as CartIcon } from './assets/cart.svg';
import { ReactComponent as PersonIcon } from './assets/person.svg';
import { axios } from './axios';

const navbarStyle = css`
    border-bottom: 1px solid #f4f4f4;
    padding: 0 50px;
`

export const Navbar = withRouter(props => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        if (props?.location?.pathname.includes('/admin')) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [props?.location?.pathname]);

    const token = localStorage.getItem('token');

    return (
        <div className={navbarStyle}>
            {isAdmin && (
                <nav className="navbar navbar-light justify-content-start">
                    <a className="navbar-brand" style={{ marginRight: 50 }} onClick={() => props.history.push('/admin/products')}>Shop</a>
                    <div onClick={() => props.history.push('/admin/users')} style={{ marginRight: 30 }}>Korisnici</div>
                    <div onClick={() => props.history.push('/admin/products')} style={{ marginRight: 30 }}>Proizvodi</div>
                    <div onClick={() => props.history.push('/admin/orders')} style={{ marginRight: 30 }}>Narudzbe</div>
                    <div onClick={() => props.history.push('/admin/categories')}>Kategorije</div>
                </nav>
            )}
            {!isAdmin && (
                <nav className="navbar navbar-light justify-content-between">
                    <a className="navbar-brand" onClick={() => props.history.push('/')}>Shop</a>
                    <div onClick={() => props.history.push('/products')}>Proizvodi</div>
                    <div className="d-flex flex-row">
                        {!isNil(token) &&
                            <div className="d-flex flex-column" onClick={() => setIsDropdownVisible(!isDropdownVisible)} style={{ marginRight: 20, position: 'relative' }}>
                                <PersonIcon width="25px" height="25px" />
                                {isDropdownVisible && <div style={{ position: 'absolute', top: 40, border: '1px solid #f4f4f4', borderRadius: 2, display: 'flex', flexDirection: 'column', zIndex: 100, backgroundColor: 'white' }}>
                                    <a
                                        className="navbar-brand"
                                        onClick={() => {
                                            const id = localStorage.getItem('userId');
                                            props.history.push(`/account/${id}`);
                                        }}
                                        style={{ fontSize: 14, marginLeft: 10}}
                                    >Account</a>
                                    <a
                                        className="navbar-brand"
                                        onClick={() => {
                                            const id = localStorage.getItem('userId');
                                            props.history.push(`/orders/${id}`);
                                        }}
                                        style={{ fontSize: 14, marginLeft: 10 }}
                                    >Orders</a>
                                    <a
                                        className="navbar-brand"
                                        onClick={() => {
                                            props.history.push('/login');
                                            delete axios.defaults.headers['Authorization'];
                                            localStorage.removeItem('token');
                                            localStorage.removeItem('userId');
                                            localStorage.removeItem('role');
                                        }}
                                        style={{ fontSize: 14, marginLeft: 10 }}
                                    >Logout</a>
                                </div>}
                            </div>
                        }
                        {isNil(token) &&
                            <div onClick={() => props.history.push('/login')} style={{ marginRight: 10 }}>
                                Login
                            </div>
                        }
                        {!isNil(token) &&
                            <div onClick={() => props.history.push('/cart')}>
                                <CartIcon width="25px" height="25px"/>
                            </div>
                        }
                    </div>
                </nav>
            )}
        </div>
    );
});
