export default class Section {
    constructor({ items, renderer}, containerSelector) {
        this._rendererItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render() {
        this._rendererItems.forEach(card => {
            this._renderer(card);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}