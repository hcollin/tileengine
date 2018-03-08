import React from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import Card from './Card';

import GameStore from '../../Stores/GameStore';
import Actions from '../../Stores/Actions';

import './deck.css';

@observer
export default class Deck extends React.Component {

    @observable drawingCard = false;

    @action
    drawTopCard() {
        if(!GameStore.activePlayer) {
            return;
        }
        if(GameStore.activePlayer.cardsInHand.length >= GameStore.activePlayer.maxHandSize) {
            return;
        }

        // this.drawingCard = true;
        Actions.drawNewCard();

        // setTimeout(() => {
        //     this.drawingCard = false;
        //     }, 400);

    }

    render() {

        if(GameStore.deck.isEmpty) {
            return (
                <div className="deck">
                    <h1 className="empty">EMPTY DECK</h1>
                    <label className="deckinfo">{GameStore.deck.cards.length} / {GameStore.deck.origSize}</label>
                </div>
            )
        }

        const topCard = GameStore.deck.topCard();
        return (
          <div className="deck" onClick={() => { this.drawTopCard()}}>

              <Card card={topCard} faceUp={false} />

              {this.drawingCard &&
                <Card card={topCard} faceUp={false} className="dummyDrawCard drawaing"/>
              }
              <label className="deckinfo">{GameStore.deck.cards.length} / {GameStore.deck.origSize} <span className="discard">{GameStore.deck.discard.length}</span></label>
          </div>
        );
    }
}