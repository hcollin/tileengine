import React from 'react';

import PlayerBoard from './PlayerBoard';

import GameStore from '../../Stores/GameStore';

import "./playerboardsview.scss";

export default class PlayerBoardsView extends React.Component {


    render() {
        return (
            <div className="playerboardsview">
                {GameStore.players.map(player => {
                return (
                <PlayerBoard player={player} key={player.id} />
                )
                })}
            </div>
        );
    }

}