import { observable, action } from 'mobx';



class CardDisplayStore {

    @observable card = false;
    @observable openUntilClosed = false;
    @observable onCloseCallback = false;
    @observable onFlipCallback = false;
    @observable onSelectCallback = false;

    @action
    showCard(card, asStatic=false) {
        this.card = card;
        this.openUntilClosed = asStatic;


    }

    @action
    hideCard() {
        if(!this.openUntilClosed) {
            this.closeCard();
        }
    }

    @action
    closeCard() {
        this.card = false;
        this.openUntilClosed = false;
        this.onFlipCallback = false;
        this.onSelectCallback = false;
        this.onCloseCallback = false;
    }

    @action
    onFlip(cb) {
        this.onFlipCallback = cb;
    }

    @action
    noFlip() {
        this.onFlipCallback = false;
    }

    @action
    onSelect(cb) {
        this.onSelectCallback = cb;
    }

    @action
    noSelect() {
        this.onSelectCallback = false;
    }

    @action
    onClose(cb) {
        this.onCloseCallback = cb;
    }

    @action
    setAsStatic() {
        this.openUntilClosed = true;
    }

    get showActionButtonFooter() {
        return this.onFlipCallback || this.onSelectCallback;
    }

    isVisible() {
        return this.card !== false;
    }

}

export default new CardDisplayStore();