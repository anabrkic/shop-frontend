import React from "react"
import { makeAutoObservable } from 'mobx'
import { forEach, remove } from 'lodash';
import { persist } from 'mobx-persist';

import { hydrate } from './hydrate';

class _Cart {
    @persist('list')
    cartItems = [];

    constructor() {
        makeAutoObservable(this)
    }

    addToCart(product) {
        this.cartItems.push(product);
    }

    increaseItemCount(id) {
        forEach(this.cartItems, (item, index) => {
            if (item._id === id) {
                this.cartItems[index] = { ...item, quantity: this.cartItems[index].quantity + 1 };
            }
        })
    }

    decreaseItemCount(id) {
        forEach(this.cartItems, (item, index) => {
            if (item._id === id) {
                this.cartItems[index] = { ...item, quantity: this.cartItems[index].quantity - 1 };
                if (this.cartItems[index].quantity === 0) {
                    remove(this.cartItems, cartItem => cartItem._id === id);
                }
            }
        })
    }
}

export const Cart = new _Cart();

hydrate('cart', Cart).then(() => console.log('cart hydrated!'));
