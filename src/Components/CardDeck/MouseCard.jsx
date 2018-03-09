import React from 'react';
import { observer } from 'mobx-react';

import Card from './Card';

import MouseCardStore from '../../Stores/MouseCardStore';

import './mousecard.scss';

@observer
export default class MouseCard extends React.Component {

    render() {

        if(!MouseCardStore.card) {
            return null;
        }

        const style = {
            top: MouseCardStore.y,
            left: MouseCardStore.x
        };

        // console.log(style);
        return(
            <div className="mousecard" style={style}>
                <Card card={MouseCardStore.card} className="mini" faceUp={true} />
            </div>
        );
    }
}