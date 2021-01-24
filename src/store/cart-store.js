import React from "react"
import {computed, makeAutoObservable} from 'mobx'
import { forEach, remove, find } from 'lodash';
import { persist } from 'mobx-persist';

import { hydrate } from './hydrate';

class _Cart {
    @persist('list')
    cartItems = [];

    constructor() {
        makeAutoObservable(this)
    }

    addToCart(product) {
        if (!find(this.cartItems, cartItem => cartItem._id === product._id)) {
            this.cartItems.push(product);
        } else {
            this.increaseItemCount(product._id);
        }
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

    emptyCart() {
        this.cartItems = [];
    }

    @computed
    get totalCost() {
        let cost = 0;
        for (let cartItem of this.cartItems) {
            cost += cartItem.quantity * cartItem.price;
        }
        return cost;
    }
}

export const Cart = new _Cart();

hydrate('cart', Cart).then(() => console.log('cart hydrated!'));
