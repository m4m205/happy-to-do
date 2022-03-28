export default class NiveaubepalingAPI {
  static getBaseURL() {
    return 'https://todo-api.niveaubepaling.nl/'
  }

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
      `${this.getBaseURL()}list`,
      this.getFetchOptions("GET")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static getItems(id) {
    return fetch(
      `${this.getBaseURL()}list/${id}`,
      this.getFetchOptions("GET")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static addItem(id, payload) {
    return fetch(
      `${this.getBaseURL()}list/${id}`,
      this.getFetchOptions("POST", payload)
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static addList(payload) {
    return fetch(
      `${this.getBaseURL()}list`,
      this.getFetchOptions("POST", payload)
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static updateItem(listId, itemId, payload) {
    return fetch(
      `${this.getBaseURL()}list/${listId}/${itemId}`,
      this.getFetchOptions("PATCH", payload)
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static deleteItem(listId, itemId) {
    return fetch(
      `${this.getBaseURL()}list/${listId}/${itemId}`,
      this.getFetchOptions("DELETE")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }

  static deleteList(listId) {
    return fetch(
      `${this.getBaseURL()}list/${listId}`,
      this.getFetchOptions("DELETE")
    ).then((res) => (!res.ok ? Promise.reject(res) : res));
  }
}
