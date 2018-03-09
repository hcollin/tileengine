import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import TitleView from './Views/TitleView';
import ActionView from './Views/ActionView';
import PlayerBoardsView from './PlayerBoard/PlayerBoardsView';
import CardDisplayer from './Views/CardDisplayer';
import MouseCard from './CardDeck/MouseCard';

import PlayerBoard from './PlayerBoard/PlayerBoard';
import Board from './Board/Board';
import Deck from './CardDeck/Deck';
import Hand from './CardDeck/Hand';
import Card from './CardDeck/Card';

import GameStore from '../Stores/GameStore';
import MouseCardStore from '../Stores/MouseCardStore';

import "./game.scss";

@observer
export default class Game extends React.Component {

    constructor(props) {
        super(props);
    }

    @action
    turnCardUpsideDown() {
        GameStore.activePlayer.selectedCard.flipUpsideDown();
    }

    trackMousePosition(e) {
        if(MouseCardStore.card) {
            MouseCardStore.setPoint(e.screenX, e.screenY);
            console.log(e);
        }
    }

    render() {
        return (
        <div className="game layout" onMouseMove={this.trackMousePosition.bind(this)}>

            <MouseCard />

            <div className="layout-modal">

            </div>



            <div className="layout-left">

                <div className="layout-gametable">
                    <Board />
                    <CardDisplayer />
                </div>

                <div className="layout-hand">
                    <Hand />
                </div>


            </div>

            <div className="layout-right">

                <div className="layout-title">
                    <TitleView />
                </div>

                <div className="layout-players">
                    <PlayerBoardsView />
                </div>

                <div className="layout-deck">
                    Deck
                </div>

                <div className="layout-console">
                    Console
                </div>

                <div className="layout-actions">
                    <ActionView />

                </div>


            </div>





            {/*{GameStore.players.map(player => {*/}
                {/*return (*/}
                    {/*<PlayerBoard player={player} key={player.id} />*/}
                {/*)*/}
            {/*})}*/}

            {/*<Deck />*/}

            {/*<NextPlayerButton />*/}

            {/*{GameStore.activePlayer &&*/}
                {/*<div className="activeplayer">{GameStore.activePlayer.name}</div>*/}
            {/*}*/}

            {/*{GameStore.activePlayer.selectedCard &&*/}
                {/*<div className="selectedcard">*/}
                    {/*<div className="selectedside">*/}
                        {/*SELECTED*/}
                    {/*</div>*/}
                    {/*<Card card={GameStore.activePlayer.selectedCard} faceUp={true} onClick={() => { this.turnCardUpsideDown(); }} />*/}
                {/*</div>*/}
            {/*}*/}
            {/*{GameStore.zoomedCard &&*/}
                {/*<div className="zoomedcard">*/}
                    {/*<Card card={GameStore.zoomedCard} faceUp={true} />*/}
                {/*</div>*/}
            {/*}*/}

        </div>
        );
    }

}