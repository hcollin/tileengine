import React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import Card from '../CardDeck/Card';

import GameStore from '../../Stores/GameStore';
import CardDisplayStore from '../../Stores/CardDisplayStore';

import "./carddisplayer.scss";

@observer
export default class CardDisplayer extends React.Component {

    @action
    closeDisplay() {
        if(CardDisplayStore.onCloseCallback) {
            CardDisplayStore.onCloseCallback(CardDisplayStore.card);
        }
        CardDisplayStore.closeCard();
    }

    @action
    triggerFlip() {
        if(CardDisplayStore.onFlipCallback) {
            CardDisplayStore.onFlipCallback(CardDisplayStore.card);
        }
    }

    @action
    triggerSelect() {
        if(CardDisplayStore.onSelectCallback) {
            CardDisplayStore.onSelectCallback(CardDisplayStore.card);
        }
    }

    render() {
        if(!CardDisplayStore.isVisible()) {
            return null;
        }

        const card = CardDisplayStore.card;

        return(
            <div className="carddisplayer">
                <div className="container">
                    {CardDisplayStore.openUntilClosed &&
                        <div className="closebutton" onClick={() => this.closeDisplay()} >X</div>
                    }
                    <Card card={card} faceUp={true} className="extralarge" />
                    {CardDisplayStore.showActionButtonFooter &&
                        <div className="actionbuttons">
                            {CardDisplayStore.onFlipCallback &&
                                <div>
                                    <div className="flipbutton" onClick={() => this.triggerFlip()}>Flip</div>
                                </div>

                            }

                            {CardDisplayStore.onSelectCallback &&
                                <div>
                                    <div className="selectbutton" onClick={() => this.triggerSelect()}>Select</div>
                                </div>
                            }

                        </div>
                    }

                </div>
            </div>
        )

    }

}