import { create } from 'mobx-persist';

export const hydrate = create({ storage: localStorage });
