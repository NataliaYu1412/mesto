export class Card {
    name;
    src;

    constructor(container, data) {
        this.name = data.header;
        this.src = data.url;

        const cardElement = this._createCardElement(data);
        container.append(cardElement);
    }

    _createCardElement() {
        const elementsTemplate = document.querySelector('.elements-template').content;
        const elementsCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);

        const elementsPhoto = elementsCard.querySelector('.elements__photo');

        elementsCard.querySelector('.elements__title').textContent = this.name;
        elementsPhoto.src = this.src;
        elementsPhoto.alt = this.name;

        return elementsCard;
    }
    
    _add
}