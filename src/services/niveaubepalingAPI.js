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

  static async getLists() {
    const res = await fetch(
      `${this.getBaseURL()}list`,
      this.getFetchOptions("GET")
    );
    return (!res.ok ? Promise.reject(res) : res);
  }

  static async getItems(id) {
    const res = await fetch(
      `${this.getBaseURL()}list/${id}`,
      this.getFetchOptions("GET")
    );
    return (!res.ok ? Promise.reject(res) : res);
  }

  static async addItem(id, payload) {
    const res = await fetch(
      `${this.getBaseURL()}list/${id}`,
      this.getFetchOptions("POST", payload)
    );
    return (!res.ok ? Promise.reject(res) : res);
  }

  static async addList(payload) {
    const res = await fetch(
      `${this.getBaseURL()}list`,
      this.getFetchOptions("POST", payload)
    );
    return (!res.ok ? Promise.reject(res) : res);
  }

  static async updateItem(listId, itemId, payload) {
    const res = await fetch(
      `${this.getBaseURL()}list/${listId}/${itemId}`,
      this.getFetchOptions("PATCH", payload)
    );
    return (!res.ok ? Promise.reject(res) : res);
  }

  static async deleteItem(listId, itemId) {
    const res = await fetch(
      `${this.getBaseURL()}list/${listId}/${itemId}`,
      this.getFetchOptions("DELETE")
    );
    return (!res.ok ? Promise.reject(res) : res);
  }

  static async deleteList(listId) {
    const res = await fetch(
      `${this.getBaseURL()}list/${listId}`,
      this.getFetchOptions("DELETE")
    );
    return (!res.ok ? Promise.reject(res) : res);
  }
}
