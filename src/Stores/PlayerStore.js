import { observable, action } from 'mobx';
import uuid from 'uuid';

export default class PlayerStore {

    @observable name = "No name";
    @observable color = "black";
    @observable vps = 0;
    @observable resources = 0;

    @observable cardsInHand = [];

    @observable selectedCard = false;

    @observable maxHandSize = 3;


    constructor(name="No name", color="black") {
        this.id = uuid.v4();
        this.name = name;
        this.color = color;
    }

    @action changeResources(amount) {
        this.resources += amount;
        if(this.resources < 0) {
            this.resources = 0;
        }
    }

    @action changeVps(amount) {
        this.vps += amount;
        if(this.vps < 0) {
            this.vps = 0;
        }
    }

    @action addCardToHand(card) {
        if(this.cardsInHand.length < this.maxHandSize) {
            this.cardsInHand.push(card);
        }
    }

    @action selectCardFromHand(index) {
        this.selectedCard = this.cardsInHand.splice(index, 1)[0];
    }

    @action setSelectedCard(card) {
        this.selectedCard = card;
    }

    @action getSelectedCard() {
        const card = this.selectedCard;
        this.selectedCard = false;
        return card;
    }

    get hasCardsInHand() {
        return this.cardsInHand && this.cardsInHand.length > 0;
    }
}

