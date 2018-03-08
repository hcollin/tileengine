import { observable, action } from 'mobx';


import GameStore from './GameStore';

class Actions {

    @observable turns = [];

    @observable currentTurn = {
        cardDrawn: false,
        tilesRotated: [],
        cardPlaced: false
    };

    @action
    drawNewCard() {
        console.log("ACTION: draw new card");
        const card = GameStore.deck.drawCard(1);
        GameStore.activePlayer.addCardToHand(card);
        this.currentTurn.cardDrawn = card;

    }

    @action
    playCardToSlot(slotKey, slotId) {
        console.log("ACTION: Play card to slot");
        this.currentTurn.cardPlaced = slotId;
        GameStore.slots.setCardToSlot(slotKey, slotId, GameStore.activePlayer.getSelectedCard());

    }

    @action
    rotateTile(tile) {
        const rotationInfo = this.currentTurn.tilesRotated.find(t => t.id === tile.id);

        if(rotationInfo === undefined && this.currentTurn.tilesRotated.length >= 3) {
            console.log("Maximum number of tiles rotated this turn");
            return false;
        }
        console.log("ACTION: Rotate tile ", tile.id, tile.angle, rotationInfo);
        const oldAngle = tile.angle;
        tile.rotateClockwise();
        if(rotationInfo === undefined) {
            this.currentTurn.tilesRotated.push({id: tile.id, angle: tile.angle, oldAngle: oldAngle, origAngle: oldAngle});
        } else {
            rotationInfo.oldAngle = oldAngle;
            rotationInfo.angle = tile.angle;
        }
    }

    @action
    nextTurn() {
        if(!this.currentTurn.cardPlaced) {
            return;
        }
        console.log("ACTION: Pass turn");
        if(!this.currentTurn.cardDrawn) {
            this.drawNewCard();
        }
        const oldTurn = this.currentTurn;
        this.turns.push(oldTurn);
        console.log("ACTIONS: ", oldTurn);
        GameStore.board.clearRotations();
        GameStore.nextPlayer();
        this.currentTurn = {
            cardDrawn: false,
            tilesRotated: [],
            cardPlaced: false
        };
    }

}

export default new Actions();