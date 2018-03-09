import React from 'react';
import {observer} from 'mobx-react';

import GameStore from '../../Stores/GameStore';
import CardDisplayStore from '../../Stores/CardDisplayStore';


import './card.scss';

@observer
export default class Card extends React.Component {

    showDetails() {
        if(this.props.zooming) {
            CardDisplayStore.showCard(this.props.card);
        }
    }

    hideDetails() {

        if(this.props.zooming) {
            CardDisplayStore.hideCard();
        }
    }

    render() {

        const classes = "card "
            + (this.props.className ? this.props.className : "")
            + (this.props.card.upsideDown? " upsidedown" : "");

        let imgUrl = this.props.card.faceDown;

        if(this.props.faceUp) {
            imgUrl = this.props.card.faceUp;
        }

        return (

            <div className={classes}>
                <img src={imgUrl} className="card" onClick={() => {if(this.props.onClick) { this.props.onClick();}}} onMouseEnter={() => this.showDetails()} onMouseLeave={() => this.hideDetails()} />
            </div>
        );
    }
}