import React from 'react';
import {observer} from 'mobx-react';
import {action} from 'mobx';

import Card from './Card';

import GameStore from '../../Stores/GameStore';
import CardDisplayStore from '../../Stores/CardDisplayStore';
import MouseCardStore from '../../Stores/MouseCardStore';

import './hand.scss';

@observer
export default class Hand extends React.Component {


    @action
    selectCard(cardIndex) {
        GameStore.activePlayer.selectCardFromHand(cardIndex);

        CardDisplayStore.onFlip(action((card) => {
            GameStore.activePlayer.selectedCard.flipUpsideDown();
            console.log("FLIPETY FLIP!", card.angle);
        }));

        CardDisplayStore.onClose((card) => {
           GameStore.activePlayer.addCardToHand(card);
        });

        CardDisplayStore.onSelect((card) => {
            MouseCardStore.start(card);
            CardDisplayStore.closeCard();
        });
        CardDisplayStore.showCard(GameStore.activePlayer.selectedCard, true);
    }

    render() {

        const player = GameStore.activePlayer;

        if (!player) {
            return null;
        }

        if (!player.cardsInHand || player.cardsInHand.length === 0) {
            return null;

        }

        return (
            <div className="hand">
                {player.cardsInHand.map((card, i) => (
                        <Card card={card} key={card.id} className="small" faceUp={true} onClick={() => this.selectCard(i)}
                              zooming={true}/>
                    )
                )}
            </div>
        )
    }
}
