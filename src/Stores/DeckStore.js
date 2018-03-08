import { observable, action } from 'mobx';
import uuid from 'uuid';


import imgCard1 from '../imgs/card1.png';
import imgCard2 from '../imgs/card2.png';
import imgCard3 from '../imgs/card3.png';
import imgCard4 from '../imgs/card4.png';
import imgCard5 from '../imgs/card5.png';
import imgCard6 from '../imgs/card6.png';
import imgCard7 from '../imgs/card7.png';
import imgCard8 from '../imgs/card8.png';
import imgCard9 from '../imgs/card9.png';
import imgCard10 from '../imgs/card10.png';

import imgCardBack from '../imgs/cardback.png';

export default class DeckStore {

    @observable cards = [];
    @observable isFaceDown = true;

    @observable discard = [];

    constructor(cards=null) {
        if(cards) {
            this.cards = cards;
        }
    }

    @action generateDefaultDeck() {

        for(let i = 0; i < 3; i++) {
            this.addCard(new CardStore(imgCard1, imgCardBack, true));
            this.addCard(new CardStore(imgCard2, imgCardBack, true));
            this.addCard(new CardStore(imgCard3, imgCardBack, true));
            this.addCard(new CardStore(imgCard4, imgCardBack, true));
            this.addCard(new CardStore(imgCard5, imgCardBack, true));
            this.addCard(new CardStore(imgCard6, imgCardBack, true));
            this.addCard(new CardStore(imgCard7, imgCardBack, true));
            this.addCard(new CardStore(imgCard8, imgCardBack, true));
            this.addCard(new CardStore(imgCard9, imgCardBack, true));
            this.addCard(new CardStore(imgCard10, imgCardBack, true));
        }

        this.shuffleDeck();

        this.origSize = this.cards.length;

    }

    @action addCard(card, toTop=false) {
        if(toTop) {
            this.cards.unshift(card);
        } else {
            this.cards.push(card);
        }
    }

    get isEmpty() {
        return this.cards.length <= 0;
    }

    @action shuffleDeck() {
       this._shuffle(this.cards);
    }

    @action drawCard(count=1, fromTop=true) {
        if(this.cards.length < count) {
            return null;
        }

        return this.cards.shift();
    }

    @action peekCard(count=1) {
        return this.cards[0];
    }

    @action topCard() {
        return this.peekCard(1);
    }

    @action placeToDiscard(card) {
        this.discard.push(card);
    }

    _shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }


}

class CardStore {

    @observable isFaceDown = true;
    @observable upsideDown = false;

    constructor(faceUp, faceDown, isFaceDown=true) {
        this.faceUp = faceUp;
        this.faceDown = faceDown;
        this.isFaceDown = isFaceDown;
        this.id = uuid.v4();
    }

    @action flipCard() {
        this.isFaceDown = !this.isFaceDown;
    }

    @action flipUpsideDown() {
        this.upsideDown = !this.upsideDown;
    }

}

export { CardStore };
