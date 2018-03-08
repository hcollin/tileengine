import { observable, action } from 'mobx';

class CardSlotsStore {

    @observable slots = {
        top: [false, false, false, false, false],
        left: [false, false, false, false, false],
        bottom: [false, false, false, false, false],
        right: [false, false, false, false, false]
    };


    @action setCardToSlot(key, id, card) {
        this.slots[key][id] = card;
    }

    @action pickUpCardFromSlot(key, id) {
        const card = this.slots[key][id];
        this.slots[key][id] = false;
        return card;
    }

    getSlotsByKey(key) {
        return this.slots[key];
    }


}

export default new CardSlotsStore();