
import React from 'react';
import { observer } from 'mobx-react';

import Tile from './Tile';
import InputOutput from './InputOutput';

import './board.scss';

import BoardStore from '../../Stores/BoardStore';
import Actions from '../../Stores/Actions';

@observer
export default class Board extends React.Component {

    constructor(props) {
        super(props);
    }

    rotateTile(tile) {
        Actions.rotateTile(tile);
    }


    render() {

        return (
            <div className="board">
                <div className="corner" />
                <InputOutput direction="horizontal" slotKey="top" />
                <div className="corner" />
                <InputOutput direction="vertical"  slotKey="left"/>
                <div className="tileboard">
                    {BoardStore.tiles.map((t, i) => (
                        <Tile tile={t} type={t.type} point={t.getPoint()} key={i} handleClick={() => {this.rotateTile(t)}} />
                    ))}
                </div>
                <InputOutput direction="vertical" slotKey="right"/>
                <div className="corner" />
                <InputOutput direction="horizontal" slotKey="bottom"/>
                <div className="corner" />
            </div>

        )

    }

}
