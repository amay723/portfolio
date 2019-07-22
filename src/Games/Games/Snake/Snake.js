import React from "react";

import './Snake.css'

const keyMappings = {
    'W': 'UP',
    'A': 'LEFT',
    'S': 'DOWN',
    'D': 'RIGHT'
};

// function Square()

class SnakeGame extends React.Component {

    constructor(props) {
        super(props);

        console.log('yo');

        this.dimensions = 25;



        let board = [];

        // initialize dimensions by dimensions 2d array
        for(let i = 0; i < this.dimensions; i++) {
            board.push([]);
            for(let j = 0; j < this.dimensions; j++) {

                if(i === 0 || j === 0 || i === this.dimensions-1 || j === this.dimensions-1)
                    board[i].push(-1);
                else
                    board[i].push(0);
            }
        }

        console.log(board);

        let freeArray = Array(this.dimensions);
        let lastFree = 0;

        console.log(freeArray);









        // Initialize the board
        this.board = new Array(this.dimensions);
        for(let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(this.dimensions);
        }

        // Set all board values to 0
        for(let i = 0; i < this.dimensions; i++ ) {
            for(let j = 0; j < this.dimensions; j++) {
                this.board[i][j] = 0;
            }
        }

        // KEY: 0 - Empty Space, 1 - Worm Head, 2 - Worm Body
        this.board[Math.floor(this.dimensions/2)][Math.floor(this.dimensions/2)] = 1;
        // this.wormHead = {
        //     x: Math.floor(this.dimensions/2),
        //     y: Math.floor(this.dimensions/2)
        // };

        this.state = {
            currentKey: '',
            wormHead:{
                x: Math.floor(this.dimensions/2),
                y: Math.floor(this.dimensions/2)
            }
            // board: board.slice()
        };

        this.handleMovement = this.handleMovement.bind(this);
    }

    componentDidMount() {
        // Auto Scroll to put game in view of page
        window.scrollTo(0,document.body.scrollHeight);
    }

    handleMovement(event) {

        // Get key code from pressed key
        let direction = String.fromCharCode(event.keyCode);
        // Convert char to "LEFT, RIGHT, UP, DOWN" enum values
        direction = keyMappings[direction];

        console.log(direction);

        switch(direction) {
            case 'UP': {
                // Up movement handling
                // const {board} = this.state;

                this.board[this.state.wormHead.x][this.state.wormHead.y] = 0;
                this.board[this.state.wormHead.x][this.wormHead.y-1] = 1;

                let {wormHead} = this.state;

                wormHead = {
                    x: this.wormHead.x,
                    y: this.state.wormHead.y-1
                };

                this.setState({
                    wormHead,
                    currentKey: String.fromCharCode(event.keyCode)
                });
                break;
            }
            case 'LEFT': {
                // left movement handling
                // const {board} = this.state;

                this.board[this.state.wormHead.x][this.state.wormHead.y] = 0;
                this.board[this.state.wormHead.x-1][this.state.wormHead.y] = 1;

                let {wormHead} = this.state;

                wormHead = {
                    x: this.wormHead.x-1,
                    y: this.state.wormHead.y
                };

                this.setState({
                    wormHead,
                    currentKey: String.fromCharCode(event.keyCode)
                });
                break;
            }
            case 'RIGHT': {
                // right movement handling
                // const {board} = this.state;

                this.board[this.state.wormHead.x][this.state.wormHead.y] = 0;
                this.board[this.state.wormHead.x+1][this.state.wormHead.y] = 1;

                let {wormHead} = this.state;

                wormHead = {
                    x: this.wormHead.x+1,
                    y: this.state.wormHead.y
                };

                this.setState({
                    wormHead: wormHead,
                    currentKey: String.fromCharCode(event.keyCode)
                });
                break;
            }
            case 'DOWN': {
                // down movement handling
                // const {board} = this.state;

                this.board[this.state.wormHead.x][this.state.wormHead.y] = 0;
                this.board[this.state.wormHead.x][this.state.wormHead.y+1] = 1;

                let {wormHead} = this.state;

                wormHead = {
                    x: this.wormHead.x,
                    y: this.state.wormHead.y+1
                };

                this.setState({
                    wormHead,
                    currentKey: String.fromCharCode(event.keyCode)
                });
                break;
            }
            default: {
                // invalid direction key, do nothing
                break;
            }
        }

    }


    render() {

        // console.log(this.board);

        return (
            <div>
                <h2>Snake Game</h2>

                <h4>Current Key: {this.state.currentKey}</h4>

                {/*<div className="grid-container">*/}
                {/*    <div className="grid-item">1</div>*/}
                {/*    <div className="grid-item">2</div>*/}
                {/*    <div className="grid-item">3</div>*/}
                {/*    <div className="grid-item">4</div>*/}
                {/*    <div className="grid-item">5</div>*/}
                {/*    <div className="grid-item">6</div>*/}
                {/*    <div className="grid-item">7</div>*/}
                {/*    <div className="grid-item">8</div>*/}
                {/*    <div className="grid-item">9</div>*/}
                {/*</div>*/}

                {/*<div className="game-board">*/}
                {/*    {*/}
                {/*        this.board.map( (itm, idx) => {*/}

                {/*            return (<tr className="game-board-row">{*/}
                {/*                this.board[idx].map( (itm2, idx2) => {*/}

                {/*                    return (<td className="game-board-box">{this.board[idx][idx2]}</td>);*/}
                {/*                })*/}
                {/*            }</tr>)*/}
                {/*        })*/}
                {/*    }*/}
                {/*</div>*/}

                <div className="game-board" style={{'grid-template-columns': `repeat(${this.dimensions}, 1fr)`}}
                     onKeyDown={this.handleMovement}
                     tabIndex="0">
                    {
                        this.board.map( (itm, idx) => {

                            return (
                                this.board[idx].map( (itm2, idx2) => {

                                    let squareColor = "";
                                    let num = this.board[idx][idx2];

                                    switch( num ) {
                                        case 0: {
                                            break;
                                        }
                                        case 1: {
                                            squareColor = "red";
                                            break;
                                        }
                                        case 2: {
                                            squareColor = "orangered";
                                            break;
                                        }
                                        case 3: {
                                            squareColor = "yellow";
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }


                                    return (<div className="game-board-box" style={ squareColor !== "" ? {backgroundColor: squareColor} : {} }/>);
                                })

                            )
                        })
                    }
                </div>

            </div>
        );
    }

}

export default SnakeGame;