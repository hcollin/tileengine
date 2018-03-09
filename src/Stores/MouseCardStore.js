import { observable, action } from 'mobx';


class MouseCardStore {

    @observable card = false;

    @observable x = 0;
    @observable y = 0;

    @action
    start(card) {
        this.card = card;

        // this.follower
    }

    @action
    setPoint(x, y) {
        this.x = x;
        this.y = y;
    }

    @action
    stop() {
        this.card = false;
    }



}


export default new MouseCardStore();
