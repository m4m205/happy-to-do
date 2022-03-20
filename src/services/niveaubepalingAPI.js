export default class NiveaubepalingAPI {
  static getFetchOptions(method, passedBody) {
    const fetchOptions = {
      method: method,
      headers: {
        Accept: "application/json",
        Origin: "*",
        "Content-type": "application/json",
      },
      body: passedBody ? JSON.stringify(passedBody) : undefined,
    };
    return fetchOptions;
  }

  static getLists() {
    return fetch(
      `https://todo-api.niveaubepaling.nl/list`,
      this.getFetchOptions("GET")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static getItems(id) {
    return fetch(
      `https://todo-api.niveaubepaling.nl/list/${id}`,
      this.getFetchOptions("GET")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static addItem(id, payload) {
    return fetch(
      `https://todo-api.niveaubepaling.nl/list/${id}`,
      this.getFetchOptions("POST", payload)
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static addList(payload) {
    return fetch(
      `https://todo-api.niveaubepaling.nl/list`,
      this.getFetchOptions("POST", payload)
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static updateItem(listId, itemId, payload) {
    return fetch(
      `https://todo-api.niveaubepaling.nl/list/${listId}/${itemId}`,
      this.getFetchOptions("PATCH", payload)
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static deleteItem(listId, itemId) {
    return fetch(
      `https://todo-api.niveaubepaling.nl/list/${listId}/${itemId}`,
      this.getFetchOptions("DELETE")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static deleteList(listId) {
    return fetch(
      `https://todo-api.niveaubepaling.nl/list/${listId}`,
      this.getFetchOptions("DELETE")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }
}
