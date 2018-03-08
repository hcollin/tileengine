import React from 'react';
import {observer} from 'mobx-react';


import './card.css';

@observer
export default class Card extends React.Component {

    render() {

        const classes = "card"
            + (this.props.className ? this.props.className : "")
            + (this.props.card.upsideDown? " upsidedown" : "");

        let imgUrl = this.props.card.faceDown;

        if(this.props.faceUp) {
            imgUrl = this.props.card.faceUp;
        }

        return (

            <div className={classes}>
                <img src={imgUrl} className="card" onClick={() => {if(this.props.onClick) { this.props.onClick();}}}/>
            </div>
        );
    }
}