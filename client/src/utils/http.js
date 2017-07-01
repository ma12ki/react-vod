import { Observable } from 'rxjs';

import { apiUrl } from '../config';

const apiFetch = (path, method = 'GET') => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const config = {
        method,
        headers,
        mode: 'cors',
        cache: 'no-store',
    };
    return fetch(`${apiUrl}${path}`, config).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response);
    });
};

const apiFetch$ = (path, method = 'GET') => {
    const promise = apiFetch(path, method);
    return Observable.fromPromise(promise);
};

const get$ = (path) => {
    return apiFetch$(path, 'GET');
};

const http = {
    get$,
};

export { http };
