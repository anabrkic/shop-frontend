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

    console.log('props', props);

    return (
        <div className={navbarStyle}>
            {isAdmin && (
                <nav className="navbar navbar-light justify-content-start">
                    <a className="navbar-brand" style={{ marginRight: 50 }} onClick={() => props.history.push('/admin/products')}>Shop</a>
                    <div onClick={() => props.history.push('/admin/users')} style={{ marginRight: 30 }}>Korisnici</div>
                    <div onClick={() => props.history.push('/admin/products')}>Proizvodi</div>
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
                                {isDropdownVisible && <div style={{ position: 'absolute', top: 40, border: '1px solid #f4f4f4', borderRadius: 2 }}>
                                    <a
                                        className="navbar-brand"
                                        onClick={() => {
                                            props.history.push('/login');
                                            delete axios.defaults.headers['Authorization'];
                                            localStorage.removeItem('token');
                                        }}
                                        style={{ fontSize: 14 }}
                                    >Logout</a>
                                </div>}
                            </div>
                        }
                        <div onClick={() => props.history.push('/cart')}>
                            <CartIcon width="25px" height="25px" />
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
});
