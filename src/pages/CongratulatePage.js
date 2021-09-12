import React from 'react';
import {Typography} from "../Typography";

import { ReactComponent as CheckIcon } from '../assets/check2-circle.svg';

export const CongratulatePage = (props) => {
    return (
        <div className="d-flex flex-column align-items-center w-100" style={{ margin: '50px 0' }}>
            <CheckIcon width="100px" height="100px" />
            <Typography fontSize={24}>Čestitamo!</Typography>
            <Typography fontSize={24}>Vaša narudžba je na putu!</Typography>
            <button type="submit" className="btn btn-primary w-25 mt-2" onClick={() => props.history.push('/')} style={{ backgroundColor: '#b29e99', border: '1px solid white' }}>Nastavi kupnju</button>
        </div>
    )
}
