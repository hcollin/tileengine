import React from 'react';

import NextPlayerButton from '../PlayerBoard/NextPlayerButton';


import "./action.scss";

export default class ActionView extends React.Component {


    render() {
        return (
            <div className="action">

                <NextPlayerButton />
            </div>
        );
    }

}