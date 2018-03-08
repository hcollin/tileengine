import { observable, action } from 'mobx';

import uuid from 'uuid';

import imgTileCurve1 from '../imgs/curve1.png';
import imgTileCurve2 from '../imgs/curve2.png';
import imgTileCurve3 from '../imgs/curve3.png';
import imgTileCurve4 from '../imgs/curve4.png';
import imgTileCurve5 from '../imgs/curve5.png';
import imgTileCurve6 from '../imgs/curve6.png';
import imgTileCurve7 from '../imgs/curve7.png';
import imgTileCurve8 from '../imgs/curve8.png';
import imgTileCurve9 from '../imgs/curve9.png';
import imgTileCurve10 from '../imgs/curve10.png';
import imgTileCurve11 from '../imgs/curve11.png';
import imgTileCurve12 from '../imgs/curve12.png';
import imgTileCurve13 from '../imgs/curve13.png';
import imgTileCurve14 from '../imgs/curve14.png';
import imgTileCurve15 from '../imgs/curve15.png';
import imgTileCurve16 from '../imgs/curve16.png';

import imgTileCross1  from '../imgs/cross1.png';
import imgTileCross2  from '../imgs/cross2.png';
import imgTileCross3  from '../imgs/cross3.png';
import imgTileCross4  from '../imgs/cross4.png';

import imgTileFlag1 from '../imgs/flag1.png';
import imgTileFlag2 from '../imgs/flag2.png';
import imgTileFlag3 from '../imgs/flag3.png';
import imgTileFlag4 from '../imgs/flag4.png';

import imgTileDiamond from '../imgs/diamond1.png';

const DEFAULTBOARD = "FCCCFCXCXCCCDCCCXCXCFCCCF";

const TILESAVAILABLE = {
    curve: [
        imgTileCurve1,
        imgTileCurve2,
        imgTileCurve3,
        imgTileCurve4,
        imgTileCurve5,
        imgTileCurve6,
        imgTileCurve1,
        imgTileCurve2,
        imgTileCurve3,
        imgTileCurve4,
        imgTileCurve5,
        imgTileCurve6,
        imgTileCurve1,
        imgTileCurve2,
        imgTileCurve3,
        imgTileCurve4
    ],
    cross: [
        imgTileCross1,
        imgTileCross2,
        imgTileCross3,
        imgTileCross4
    ],
    flag: [
        imgTileFlag1,
        imgTileFlag2,
        imgTileFlag3,
        imgTileFlag4,
    ],
    diamond: [
        imgTileDiamond
    ]
};

const TILESAVAILABLE_UNIQUE = {
    curve: [
        imgTileCurve1,
        imgTileCurve2,
        imgTileCurve3,
        imgTileCurve4,
        imgTileCurve5,
        imgTileCurve6,
        imgTileCurve7,
        imgTileCurve8,
        imgTileCurve9,
        imgTileCurve10,
        imgTileCurve11,
        imgTileCurve12,
        imgTileCurve13,
        imgTileCurve14,
        imgTileCurve15,
        imgTileCurve16
    ],
    cross: [
        imgTileCross1,
        imgTileCross2,
        imgTileCross3,
        imgTileCross4
    ],
    flag: [
        imgTileFlag1,
        imgTileFlag2,
        imgTileFlag3,
        imgTileFlag4,
    ],
    diamond: [
        imgTileDiamond
    ]
};


class BoardStore {

    @observable tiles = [];


    constructor() {
        this.allTiles = TILESAVAILABLE;
    }

    @action
    clearRotations() {
        this.tiles.forEach(tile => {
            tile.resetTurn();
        });
    }

    @action
    generateBoard(boardString=DEFAULTBOARD) {

        const tileTypes = boardString.split("");

        tileTypes.forEach(typeChar => {

            const points =[
                0,
                90,
                180,
                270
            ];

            switch(typeChar) {
                case "C":
                    this.tiles.push(new TileStore("curve", this._pickRandomTile("curve"), points[Math.floor(Math.random()*points.length)]));
                    break;
                case "X":
                    this.tiles.push(new TileStore("cross", this._pickRandomTile("cross"), points[Math.floor(Math.random()*points.length)]));
                    break;
                case "F":
                    this.tiles.push(new TileStore("flag", this._pickRandomTile("flag"), points[Math.floor(Math.random()*points.length)]));
                    break;
                case "D":
                    this.tiles.push(new TileStore("diamond", this._pickRandomTile("diamond"), points[Math.floor(Math.random()*points.length)]));
                    break;
            }
        })
    }

    _pickRandomTile(type) {
        const tileIndex = Math.floor(Math.random() * this.allTiles[type].length);
        return this.allTiles[type].splice(tileIndex, 1);
    }

}

class TileStore {
    @observable type = null;
    @observable angle = null;
    @observable img = null;
    @observable rotatedThisTurn = false;

    constructor(type, img, angle=0) {
        this.id = uuid.v4();
        this.type = type;
        this.angle = angle;
        this.img = img;
    }

    getPoint() {
        switch(this.angle) {
            case 0:
                return "up";
                break;
            case 90:
                return "right";
                break;
            case 180:
                return "down";
                break;
            case 270:
                return "left";
                break;
        }
    }

    @action
    resetTurn() {
        this.rotatedThisTurn = false;
    }

    @action
    rotateClockwise() {
        this.angle += 90;
        this.rotatedThisTurn = true;
        if(this.angle >= 360) {
            this.angle = 0;
        }
    }

    @action
    rotateAntiClockwise() {
        this.angle -= 90;
        this.rotatedThisTurn = true;
        if(this.angle < 0) {
            this.angle = 270;
        }
    }

}


export default new BoardStore();