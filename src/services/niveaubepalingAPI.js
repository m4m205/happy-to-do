export default class NiveaubepalingAPI {
    static getLists() {
        const fetchOptions = {
            method: 'GET',
            headers : {
                Accept : 'application/json',
                Origin: '*',
                'Content-type': 'application/json'
            }
        };
        return fetch(`https://todo-api.niveaubepaling.nl/list`, fetchOptions)
            .then((res) => (!res.ok ? Promise.reject(res) : res));
    }

    static getItems(id) {
        const fetchOptions = {
            method: 'GET',
            headers : {
                Accept : 'application/json',
                Origin: '*',
                'Content-type': 'application/json'
            }
        };
        return fetch(`https://todo-api.niveaubepaling.nl/list/${id}`, fetchOptions)
            .then((res) => (!res.ok ? Promise.reject(res) : res));
    }

    static addItem(id, payload) {
        const fetchOptions = {
            method: 'POST',
            headers : {
                Accept : 'application/json',
                Origin: '*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        return fetch(`https://todo-api.niveaubepaling.nl/list/${id}`, fetchOptions)
            .then((res) => (!res.ok ? Promise.reject(res) : res));
    }

    static updateItem(listId, itemId, payload) {
        const fetchOptions = {
            method: 'PATCH',
            headers : {
                Accept : 'application/json',
                Origin: '*',
                'Content-type': 'application/json'
            },            
            body: JSON.stringify(payload)
        };
        return fetch(`https://todo-api.niveaubepaling.nl/list/${listId}/${itemId}`, fetchOptions)
            .then((res) => (!res.ok ? Promise.reject(res) : res));
    }

    static deleteItem(listId, itemId, payload) {
        const fetchOptions = {
            method: 'DELETE',
            headers : {
                Accept : 'application/json',
                Origin: '*',
                'Content-type': 'application/json'
            },
        };
        return fetch(`https://todo-api.niveaubepaling.nl/list/${listId}/${itemId}`, fetchOptions)
            .then((res) => (!res.ok ? Promise.reject(res) : res));
    }
}