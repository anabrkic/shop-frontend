import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { withRouter } from 'react-router';
import { isNil } from 'lodash';

import { ReactComponent as CartIcon } from './assets/cart.svg';
import { ReactComponent as PersonIcon } from './assets/person.svg';
import { axios } from './axios';
import { Typography } from "./Typography";
import { black, tanWhite, white } from "./colors";
import useAxios from "axios-hooks";

const navbarStyle = css`
    border-bottom: 1px solid #f4f4f4;
    padding: 0 50px;
    background-color: ${tanWhite};
    position: sticky;
`;

const navItemStyle = css`
  :hover {
      border-bottom: solid 2px ${black};
      transition: transform 1s ease-in-out;
  }
  cursor: pointer;
  position: relative;
`;

const centralDropdownStyle = css`
  position: absolute;
  width: 200px;
  top: 40px;
  border-radius: 4px;
  background-color: ${white};
  z-index: 150;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.1));
`;



export const Navbar = withRouter(props => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [isRightDropdownVisible, setIsRightDropdownVisible] = useState(false);
    const [isCentralDropdownVisible, setIsCentralDropdownVisible] = useState(false);

    const [{ data, loading }] = useAxios(
        'http://localhost:4000/categories'
    );

    useEffect(() => {
        if (props?.location?.pathname.includes('/admin')) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [props?.location?.pathname]);

    if (loading) {
        return null;
    }

    const handleCategoryClick = id => {
        props.history.push(`/products/${id}`);
        setIsCentralDropdownVisible(!isCentralDropdownVisible)
    }

    const token = localStorage.getItem('token');

    return (
        <div className={navbarStyle}>
            {isAdmin && (
                <nav className="navbar navbar-light justify-content-start">
                    <a className="navbar-brand" style={{ marginRight: 50 }} onClick={() => props.history.push('/admin/users')}>
                        <Typography color={black} fontSize={24} fontWeight={700}>shop. Admin</Typography>
                    </a>
                    <div onClick={() => props.history.push('/admin/users')} style={{ marginRight: 30 }}>Korisnici</div>
                    <div onClick={() => props.history.push('/admin/products')} style={{ marginRight: 30 }}>Proizvodi</div>
                    <div onClick={() => props.history.push('/admin/orders')} style={{ marginRight: 30 }}>Narudžbe</div>
                    <div onClick={() => props.history.push('/admin/categories')}>Kategorije</div>
                </nav>
            )}
            {!isAdmin && (
                <nav className="navbar navbar-light justify-content-between">
                    <a className="navbar-brand" onClick={() => props.history.push('/')}><Typography color={black} fontSize={24} fontWeight={700}>shop.</Typography></a>
                    <div className={navItemStyle} onClick={() => setIsCentralDropdownVisible(!isCentralDropdownVisible)}>
                        <Typography color={black} fontSize={16} onClick={() => {}}>PROIZVODI</Typography>
                        {isCentralDropdownVisible && <div className={centralDropdownStyle}>
                            {[{ _id: 0, name: 'Sve' }].concat(data).map(category => (
                                <a
                                    className="navbar-brand"
                                    onClick={() => handleCategoryClick(category?._id)}
                                >
                                    <Typography fontSize={14} color={black}>{category?.name}</Typography>
                                </a>
                            ))}
                        </div>}
                    </div>
                    <div className="d-flex flex-row">
                        {!isNil(token) &&
                            <div className="d-flex flex-column" onClick={() => setIsRightDropdownVisible(!isRightDropdownVisible)} style={{ marginRight: 20, position: 'relative' }}>
                                <PersonIcon width="25px" height="25px" />
                                {isRightDropdownVisible && <div style={{ position: 'absolute', top: 40, border: '1px solid #f4f4f4', borderRadius: 2, display: 'flex', flexDirection: 'column', zIndex: 100, backgroundColor: 'white' }}>
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
