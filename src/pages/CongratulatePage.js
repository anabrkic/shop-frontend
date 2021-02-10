import React from 'react';

import { ReactComponent as CheckIcon } from '../assets/check2-circle.svg';

export const CongratulatePage = (props) => {
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <CheckIcon width="100px" height="100px" />
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>Cestitamo!</div>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: '#999999' }}>Vasa narudzba je na putu!</div>
            <button type="submit" className="btn btn-primary w-25 mt-2" onClick={() => props.history.push('/')}>Nastavi kupnju</button>
        </div>
    )
}
