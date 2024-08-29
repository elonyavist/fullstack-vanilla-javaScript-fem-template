// Controller.init()
/**
 * @typedef {import('./viewBase.js').default} View
 * @typedef {import('./service.js').default} Service
 */
export default class Controller {
  /** @type {View} */
  #view;

  /** @type {Service} */
  #service;

  /** @param { {view: View, service:Service}} deps */
  constructor({ view, service }) {
    this.#view = view;
    this.#service = service;
  }

  static async init(deps) {
    const controller = new Controller(deps);
    await controller.#init();

    return controller;
  }

  #isValid(data) {
    return data.name && data.age && data.email;
  }

  async #onSubmit({ name, age, email }) {
    if (!this.#isValid({ name, age, email })) {
      this.#view.notify({ msg: "Please fill out all fields" });
      return;
    }

    this.#view.addRow({ name, age, email });
    this.#view.resetForm();

    try {
      await this.#service.createUser({ name, age, email });
    } catch (error) {
      this.#view.notify({ msg: "server is not available!" });
    }
  }

  async #getUsersFromApi() {
    try {
      const result = await this.#service.getUsers();

      return result;
    } catch (error) {
      this.#view.notify({ msg: "Failed to fetch data", isError: true });
      return [];
    }
  }

  async #init() {
    this.#view.configureFormSubmit(this.#onSubmit.bind(this));
    this.#view.configureFormClear();

    const data = await this.#getUsersFromApi();

    const initialData = [
      { name: "Elia Narducci", age: 34, email: "elianarducciweb@gmail.com" },
      { name: "Bob Rott", age: 24, email: "bobrott@gmail.com" },
      { name: "Luke Mitt", age: 25, email: "lukemitt@gmail.com" },
      ...data,
    ];

    this.#view.render(initialData);
  }
}
