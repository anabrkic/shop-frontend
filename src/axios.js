import Axios from 'axios';

// kreiranje axios objekta za http pozive, potrebno je samo postaviti bazni URL servera
export const axios = Axios.create({
    baseURL: 'http://localhost:4000/',
});

// na svaki axios zahtjev se dodaje u header Authorization u koji se zapisuje token. Taj token dobijemo iz local storagea,
// a token se u local storage spremi prilikom logina/registracije. Sprema se u local storage zato sto ukoliko ugasimo browser
// i ponovo dodjemo na stranicu, necemo se morati ponovno logirati. Iz local storagea token mozemo izbrisati rucno ili se
// mozemo logoutati sto ce imati isti efekt.
axios.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
