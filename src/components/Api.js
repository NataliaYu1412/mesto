import {cardId} from '../pages/index.js';
import {userId} from '../pages/index.js';
const CARDS_ENDPOINT = '/cards';
const PROFILE_ENDPOINT = '/users/me';


export default class Api {
    constructor(config) {
        this._url = config.baseUrl;
        this._headers = config.headers;
    }

    getAllCards() {
        return fetch(this._url + CARDS_ENDPOINT, {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка');
        });
    }

    createCard(name, link) {
        return fetch(this._url + CARDS_ENDPOINT, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка');
        });
    }

    getProfile() {
        return fetch(this._url + PROFILE_ENDPOINT, {
            method: 'GET',
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка');
        });
    }

    patchProfile(name, about) {
        return fetch(this._url + PROFILE_ENDPOINT, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка');
        });
    }

    deleteCard(cardId) {
        return fetch(this._url + PROFILE_ENDPOINT, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject('Произошла ошибка');
        });
    }
}