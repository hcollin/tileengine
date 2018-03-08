import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import PlayerBoard from './PlayerBoard/PlayerBoard';
import Board from './Board/Board';
import Deck from './CardDeck/Deck';
import Hand from './CardDeck/Hand';
import Card from './CardDeck/Card';
import NextPlayerButton from './PlayerBoard/NextPlayerButton';

import GameStore from '../Stores/GameStore';

import "./game.css";

@observer
export default class Game extends React.Component {

    constructor(props) {
        super(props);
    }

    @action
    turnCardUpsideDown() {
        GameStore.activePlayer.selectedCard.flipUpsideDown();
    }

    render() {
        return (
        <div className="game">
            {GameStore.players.map(player => {
                return (
                    <PlayerBoard player={player} key={player.id} />
                )
            })}

            <Deck />
            <Hand />
            <NextPlayerButton />
            <Board />
            {GameStore.activePlayer &&
                <div className="activeplayer">{GameStore.activePlayer.name}</div>
            }

            {GameStore.activePlayer.selectedCard &&
                <div className="selectedcard">
                    <div className="selectedside">
                        SELECTED
                    </div>
                    <Card card={GameStore.activePlayer.selectedCard} faceUp={true} onClick={() => { this.turnCardUpsideDown(); }} />
                </div>
            }
            {GameStore.zoomedCard &&
                <div className="zoomedcard">
                    <Card card={GameStore.zoomedCard} faceUp={true} />
                </div>
            }

        </div>
        );
    }

}