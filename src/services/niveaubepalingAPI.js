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
}