import React, {useEffect } from 'react';

// wrapper oko useEffect hooka kojim se omogucava pozivanje asinkronih metoda
// unutar useEffect-a.
export function useEffectAsync(effect, inputs) {
    useEffect(() => {
        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, inputs);
}
