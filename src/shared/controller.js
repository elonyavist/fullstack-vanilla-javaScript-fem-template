// Controller.init()
/**
 * @typedef {import('./viewBase').default} View
 */
export default class Controller {
  /** @type {View} */
  #view;
  /** @param { {view: View}} deps */
  constructor({ view }) {
    this.#view = view;
  }

  static init(deps) {
    const controller = new Controller(deps);
    controller.#init();
    return controller;
  }

  #init() {
    const initialData = [
      { name: "Elia Narducci", age: 34, email: "elianarducciweb@gmail.com" },
      { name: "Bob Rott", age: 24, email: "bobrott@gmail.com" },
    ];
    this.#view.render(initialData);
  }
}
