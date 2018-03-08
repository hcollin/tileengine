import React from 'react';
import { observer } from 'mobx-react';

import './tile.css';

@observer
export default class Tile extends React.Component {


    render() {

        const classes = this.props.tile.getPoint() + (this.props.tile.rotatedThisTurn ? " rotated": "");

        return (
          <div className="tile">
              <img src={this.props.tile.img} className={classes} onClick={() => {this.props.handleClick()}}/>
          </div>
        );
    }


}

