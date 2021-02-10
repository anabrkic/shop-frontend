import { create } from 'mobx-persist';

// create funkcija iz paketa mobx-persist kreira storage, u ovom slucaju local storage u koji sprema sve varijabla iz storea
// koje su dekorirane sa @persist
export const hydrate = create({ storage: localStorage });
