import React from 'react';
import {Typography} from "./Typography";
import {black, tanWhite} from "./colors";

export const Footer = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{ backgroundColor: tanWhite }}>{/* position: 'fixed', width: '100%', bottom: 0 */}
            <Typography fontSize={14} color={black}>Završni rad</Typography>
            <Typography fontSize={14} color={black}>Sveučilisni odjel za stručne studije</Typography>
            <Typography fontSize={14} color={black}>Copyright Ana Brkić</Typography>
        </div>
    )
}
