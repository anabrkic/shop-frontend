import { useEffect } from 'react';

export function useEffectAsync(effect, inputs) {
    useEffect(() => {
        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, inputs);
}
