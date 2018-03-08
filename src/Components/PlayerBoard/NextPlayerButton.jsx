import React from 'react';
import {observer} from 'mobx-react';


import Actions from '../../Stores/Actions';

import "./nextplayerbutton.css";

@observer
export default class NextPlayerButton extends React.Component {

    handleClick() {
        Actions.nextTurn();
    }

    render() {

        return(
            <div className="nextplayerbutton">
                <button onClick={() => this.handleClick()} >DONE!</button>
            </div>
        );
    }
}