import React from 'react';
import {observable, action } from 'mobx';
import { observer } from 'mobx-react';
import './io.css';

import Card from '../CardDeck/Card';

import GameStore from '../../Stores/GameStore';
import Actions from '../../Stores/Actions';

@observer
export default class InputOutput extends React.Component {

    constructor(props) {
        super(props);
    }

    @action
    handleSlotClick(slotId) {

        const cardInSlot = GameStore.slots.slots[this.props.slotKey][slotId];

        if(cardInSlot) {
            //this.discardCardInSlot(slotId);
            return;
        }

        if(GameStore.activePlayer.selectedCard) {
            this.placeCardToSlot(slotId);
        }
    }

    @action
    discardCardInSlot(slotId) {
        GameStore.deck.placeToDiscard(GameStore.slots.pickUpCardFromSlot(this.props.slotKey, slotId));
    }

    @action
    placeCardToSlot(slotId) {
        Actions.playCardToSlot(this.props.slotKey, slotId);
        // GameStore.slots.setCardToSlot(, slotId, GameStore.activePlayer.getSelectedCard());
    }

    render() {

        const classes = "io "
            + (this.props.direction === "horizontal" ? "io-horizontal " : "io-vertical ")
            + this.props.slotKey;

        const slots = GameStore.slots.getSlotsByKey(this.props.slotKey);

        return (
            <div className={classes}>
                <Slot card={slots[0]} clickSlot={() => {this.handleSlotClick(0);}} />
                <Slot card={slots[1]} clickSlot={() => {this.handleSlotClick(1);}}/>
                <Slot card={slots[2]} clickSlot={() => {this.handleSlotClick(2);}}/>
                <Slot card={slots[3]} clickSlot={() => {this.handleSlotClick(3);}}/>
                <Slot card={slots[4]} clickSlot={() => {this.handleSlotClick(4);}}/>
            </div>
        )
    }

}

@observer
class Slot extends React.Component {

    zoomIn() {
        GameStore.setZoomedCard(this.props.card);
    }

    removeZoom() {
        GameStore.clearZoomedCard();
    }

    render() {

        const classes = "slot";


        return (
            <div className={classes} onClick={() => this.props.clickSlot()}>
                {this.props.card &&
                    <div className="slotcard" onMouseEnter={() => this.zoomIn()} onMouseLeave={ () => this.removeZoom()} >
                        <Card card={this.props.card} faceUp={true} />
                    </div>
                }
            </div>
        );
    }


}