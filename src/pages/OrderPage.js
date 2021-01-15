import React from 'react';

export const OrderPage = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center titleStyle" style={{ margin: '50px 0' }}>Podaci za dostavu</div>
            <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Ime</label>
                <input type="email" className="form-control" id="nameInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="surnameInput" className="form-label">Prezime</label>
                <input type="text" className="form-control" id="surnameInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="addressInput" className="form-label">Adresa</label>
                <input type="text" className="form-control" id="addressInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="postalCodeInput" className="form-label">Postanski broj</label>
                <input type="text" className="form-control" id="postalCodeInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="cityInput" className="form-label">Grad</label>
                <input type="text" className="form-control" id="cityInput" />
            </div>
            <div className="mb-3">
                <label htmlFor="phoneInput" className="form-label">Telefon</label>
                <input type="text" className="form-control" id="phoneInput" />
            </div>
            <button type="submit" className="btn btn-primary">Naruci</button>
        </div>
    );
}
