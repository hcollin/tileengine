import { observable, action } from 'mobx';

import PlayerStore from './PlayerStore';
import BoardStore from './BoardStore';
import CardSlotsStore from './CardSlotsStore';
import DeckStore from './DeckStore';

const PLAYERCOLORS = ["red", "green", "blue", "yellow", "purple", "brown"];

class GameStore {

    @observable players = [];
    @observable activePlayer = false;

    @observable board = BoardStore;
    @observable slots = CardSlotsStore;

    @observable deck = new DeckStore();
    @observable zoomedCard = false;

    @observable actions = [];

    @action
    addNewPlayer(name, color) {
        const player = new PlayerStore(name, color);
        player.addCardToHand(this.deck.drawCard());
        player.addCardToHand(this.deck.drawCard());
        player.addCardToHand(this.deck.drawCard());
        this.players.push(player);
    }

    @action
    newGame() {
        this.players = [];
        this.board.generateBoard();
        this.deck = new DeckStore();
        this.deck.generateDefaultDeck();
        this.slots.setCardToSlot("top", 2, this.deck.drawCard());
        this.slots.setCardToSlot("bottom", 2, this.deck.drawCard());
        this.slots.setCardToSlot("left", 2, this.deck.drawCard());
        this.slots.setCardToSlot("right", 2, this.deck.drawCard());

    }

    @action setActivePlayer(playerId) {
        this.activePlayer = this.players.find(pl => pl.id === playerId);
    }

    @action setActivePlayerByIndex(index) {
        this.activePlayer = this.players[index];
    }

    @action setZoomedCard(card) {
        this.zoomedCard = card;
    }

    @action clearZoomedCard() {
        this.zoomedCard = false;
    }

    getActivePlayer() {
        return this.activePlayer;
    }

    @action
    nextPlayer() {
        const curPlayerIndex = this.players.findIndex(pla => pla.id === this.activePlayer.id);
        if(this.players.length > curPlayerIndex + 1) {
            this.setActivePlayerByIndex(curPlayerIndex+1);
        } else {
            this.setActivePlayerByIndex(0);
        }
        this.actions = [];

    }

    isActivePlayer(player) {
        return player.id === this.activePlayer.id;
    }

}


export default new GameStore();