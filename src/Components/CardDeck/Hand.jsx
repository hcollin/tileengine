import React from 'react';
import {observer} from 'mobx-react';

import Card from './Card';

import GameStore from '../../Stores/GameStore';

import './hand.css';

@observer
export default class Hand extends React.Component {



    selectCard(cardIndex) {
        console.log("SELECTED A CARD FROM HAND", cardIndex);
        GameStore.activePlayer.selectCardFromHand(cardIndex);
    }

    render() {

        const player = GameStore.activePlayer;

        if(!player) {
            return null;

        }


        if(!player.cardsInHand || player.cardsInHand.length === 0) {
            return (
                <div className="hand empty">
                    <h1>{player.name} has no cards in hand</h1>

                </div>
                )

        }

        return (
            <div className="hand">
                {player.cardsInHand.map((card, i) => (
                    <Card card={card} key={card.id} faceUp={true} onClick={() => this.selectCard(i) } />
                    )
                )}
            </div>
        )
    }
}
