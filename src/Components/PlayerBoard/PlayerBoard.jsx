import React from 'react';
import { observer } from 'mobx-react';

import './playerboard.scss';

import GameStore from '../../Stores/GameStore';

@observer
export default class PlayerBoard extends React.Component {

    constructor(props) {
        super(props);
    }

    addVp() {
        this.props.player.changeVps(1);
    }

    removeVp() {
        this.props.player.changeVps(-1);
    }

    addCube() {
        this.props.player.changeResources(1);
    }

    removeCube() {
        this.props.player.changeResources(-1);
    }

    setAsActive() {
        GameStore.setActivePlayer(this.props.player.id);
    }

    render() {

        const classes = "playerboard "
        + this.props.player.color
        + (GameStore.isActivePlayer(this.props.player) ? " active" : "");



        return(
            <div className={classes}>

                <div className="vps">
                    {this.props.player.vps}
                </div>

                <div className="playername">
                    {GameStore.isActivePlayer(this.props.player)
                        ? (<h1 onClick={() => this.setAsActive()} className="active">{this.props.player.name}</h1>)
                        : (<h1 onClick={() => this.setAsActive()}>{this.props.player.name}</h1>)}

                </div>




                {/*<Counter value={this.props.player.resources} onPlus={() => this.addCube()} onMinus={() => this.removeCube()} label="Resource Cubes"/>*/}
                {/*<Counter value={this.props.player.vps} onPlus={() => this.addVp()} onMinus={() => this.removeVp()} label="Victory Points" />*/}

                {/*<p>{this.props.player.cardsInHand.length} cards in hand</p>*/}
            </div>
        );
    }

}

const Counter = (props) => {

    return (
      <div className="counter">
          <label>{props.label}</label>
          <div className="button minus" onClick={() => {props.onMinus();}}>-</div>
          <div className="value">{props.value}</div>
          <div className="button plus" onClick={() => {props.onPlus();}}>+</div>
      </div>
    );
}