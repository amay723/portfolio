import React, { Component } from 'react';
import './Mastermind.css';

const red = require('./images/redCircle.png');
const blue = require('./images/blueCircle.png');
const green = require('./images/greenCircle.png');
const purple = require('./images/purpleCircle.png');
const teal = require('./images/tealCircle.png');
const magenta = require('./images/magentaCircle.png');
const emptyCircle = require('./images/emptyCircle.png');



class MasterTableRow extends Component {



    render() {


        return (
            <tr>

            {this.props.row.map((circle, idx) => <td key={idx}><img className="large_circle" src={circle.color} alt={circle.colorName} onClick={() => this.props.setCircle(idx)} /></td>)}
            <td className="feedback_cell">{this.props.feedback ? this.props.feedbackCircles(this.props.feedback) : ""}</td>
        </tr>
        )
    }


}

class MasterTable extends Component {



    render() {

        let last = this.props.mastermindArray.length - 1;

        return (
            <table className="board_table"><tbody>
        { this.props.mastermindArray.reverse().map( (row, idx) =>
            <MasterTableRow row={row} feedback={this.props.feedbackArray[last - idx]} feedbackCircles={this.props.feedbackCircles} setCircle={this.props.setCircle} />
        ) }
        </tbody></table>
    )
    }


}

class Palette extends Component {

    render() {

        return (<table className="palette_circles"><tbody><tr>
            {
                this.props.paletteColors.map((paletteElement, idx) =>
                    <td key={idx} onClick={() => this.props.selectedPaletteCircle(paletteElement)}>
                        <img className="large_circle" src={paletteElement.color} alt={paletteElement.colorName} /></td>)
            }
        </tr></tbody></table>
        )
    }
}


class Mastermind extends Component {

    paletteColors = [
        {color: green, colorName: 'Green'},
        {color: teal, colorName: 'Teal'},
        {color: magenta, colorName: 'Magenta'},
        {color: blue, colorName: 'Blue'},
        {color: red, colorName: 'Red'},
        {color: purple, colorName: 'Purple'}
    ];

    nonFilledCircle = {
        color: emptyCircle,
        colorName: 'Empty circle'
    };


    constructor(props) {
        super(props);

        this.combination = [
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)],
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)],
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)],
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)]
        ];

        let emptyRow = [{...this.nonFilledCircle}, {...this.nonFilledCircle}, {...this.nonFilledCircle}, {...this.nonFilledCircle}];


        this.state = {
            mastermindArray: [emptyRow], // Just an array of rows in play. could add further rows to it
            feedbackArray: [],
            statusCircle: {color: emptyCircle, colorName: 'Empty circle'},
            showCombination: false
        };

        this.turnCounter = 1;
        this.circlesLeft = 4;
        this.hasWon = false;
        this.hasLost = false;

        this.selectedPaletteCircle = this.selectedPaletteCircle.bind(this);
        this.feedbackCircles = this.feedbackCircles.bind(this);
        this.setCircle = this.setCircle.bind(this);
        this.reset = this.reset.bind(this);
        this.askReset = this.askReset.bind(this);
        this.toggleCombination = this.toggleCombination.bind(this);

        console.log(`Turn ${this.turnCounter}/8`);


    }

    componentDidMount() {
        document.title = 'Mastermind';
    }

    addRow(newFeedback) {
        let newRows = this.state.mastermindArray.slice();

        let newRow = [{...this.nonFilledCircle}, {...this.nonFilledCircle}, {...this.nonFilledCircle}, {...this.nonFilledCircle}];

        newRows.push( newRow );

        this.circlesLeft = 4;

        let feed = this.state.feedbackArray.slice();
        feed.push(newFeedback);

        this.setState( {mastermindArray: newRows, feedbackArray: feed} );
    }

    selectedPaletteCircle(circle) {

        if( this.hasWon || this.hasLost )
            return;

        console.log('selected a palette color', circle.colorName);

        let tempMaster = this.state.mastermindArray.reverse().slice();


        this.setState({statusCircle: circle, mastermindArray: tempMaster});
    }

    setCircle(idx) {

        if( this.hasWon || this.hasLost )
            return;

        let tempMaster = this.state.mastermindArray.reverse().slice();

        let last = tempMaster.length - 1;

        if( tempMaster[last][idx].colorName === 'Empty circle' && this.state.statusCircle.colorName !== 'Empty circle' ) {
            this.circlesLeft -= 1;
        }

        tempMaster[last][idx].color = this.state.statusCircle.color;
        tempMaster[last][idx].colorName = this.state.statusCircle.colorName;

        if( this.circlesLeft === 0 ) {
            this.turnCounter += 1;

            let newFeedback = this.create_feedback_circles(tempMaster[last]);


            let win = true;
            if( newFeedback.length < 4 )
                win = false;
            else {
                for (let i = 0; i < newFeedback.length; i++) {
                    if (newFeedback[i].colorName !== 'Red') {
                        win = false;
                        break;
                    }
                }
            }


            if( win ) {
                this.hasWon = true;
                this.win(newFeedback);
                return;
            }

            if(this.turnCounter > 8 ) {
		this.turnCounter = 8;
                this.hasLost = true;
                this.lose(newFeedback);
                return;
            }

            console.log(`Turn ${this.turnCounter}/8`);

            this.addRow(newFeedback);
            return;
        }

        this.setState( {mastermindArray: tempMaster} );

    }

    win(newFeedback) {

        let finalFeedback = this.state.feedbackArray.slice();
        finalFeedback.push( newFeedback );

        this.setState( {feedbackArray: finalFeedback});
    }

    lose(newFeedback) {

        let finalFeedback = this.state.feedbackArray.slice();
        finalFeedback.push( newFeedback );

        this.setState( {feedbackArray: finalFeedback});
    }

    getRandomIdx(low, high) {

            return Math.floor(Math.random() * (high - low + 1) + low);
    }

    create_feedback_circles(guess_combination) {

        let feedback_circles = [];
        let guess_colors_used = [false, false, false, false];
        let secret_color_used = [false, false, false, false];

        let feedback_idx = 0;

        for( let i = 0; i < 4; i++ ) {
            if( this.combination[i].colorName === guess_combination[i].colorName ) {
                guess_colors_used[i] = true;
                secret_color_used[i] = true;
                feedback_idx += 1;
                feedback_circles.push( {...this.paletteColors[4]} ); // red circle
            }
        }
        for( let i = 0; i < 4; i++ ) {
            if( !guess_colors_used[i] ) {
                for(let j = 0; j < 4; j++ ) {
                    if( !secret_color_used[j] && (this.combination[j].colorName === guess_combination[i].colorName ) ) {
                        feedback_circles.push( {...this.nonFilledCircle} );
                        feedback_idx += 1;
                        secret_color_used[j] = true;
                        break;
                    }

                }
            }
        }

        return feedback_circles;

    }

    feedbackCircles(feedback) {
        return (<table>
            <tbody className="feedback_table">
                <tr><td><img className="small_circle" src={feedback[0] ? feedback[0].color : "" } alt={feedback[0] ? feedback[0].colorName : "" } /></td>
                    <td><img className="small_circle" src={feedback[1] ? feedback[1].color : "" } alt={feedback[1] ? feedback[1].colorName : "" } /></td></tr>
                <tr><td><img className="small_circle" src={feedback[2] ? feedback[2].color : "" } alt={feedback[2] ? feedback[2].colorName : "" } /></td>
                    <td><img className="small_circle" src={feedback[3] ? feedback[3].color : "" } alt={feedback[3] ? feedback[3].colorName : "" } /></td></tr>
            </tbody>
            </table>);
    }

    statusRow() {
        let {
            color,
            colorName
        } = this.state.statusCircle;

        return <table className="status_circles"><tbody>
            <tr><td><img onClick={this.askReset} className="large_circle" src={red} alt="red circle" /></td>
	    <td><b>Turn Count: {this.turnCounter}/8</b></td>
           <td><img className="large_circle" src={color} alt={colorName} /></td></tr>
               </tbody></table>
    }

    toggleCombination() {
         let newToggle = !this.state.showCombination;

         let tempMaster = this.state.mastermindArray.reverse().slice();

         this.setState( {
             masterMindArray: tempMaster,
            showCombination: newToggle
         });
    }

    reset() {

        this.hasWon = false;
        this.hasLost = false;
        this.turnCounter = 1;
        this.circlesLeft = 4;

        this.combination = [
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)],
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)],
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)],
            this.paletteColors[this.getRandomIdx(0,this.paletteColors.length-1)]
        ];

        let emptyRow = [{...this.nonFilledCircle}, {...this.nonFilledCircle}, {...this.nonFilledCircle}, {...this.nonFilledCircle}];

        this.setState( {
            mastermindArray: [emptyRow], // Just an array of rows in play. could add further rows to it
            feedbackArray: [],
            statusCircle: {color: emptyCircle, colorName: 'Empty circle'}
        });

        console.log(`Turn ${this.turnCounter}/8`);

    }

    askReset() {

        let reset = window.confirm("Reset the game?");

        if( reset )
            this.reset();

    }


    render() {

        let height = 500 - this.state.mastermindArray.length * 58;

        return (
            <div className="Mastermind">
                { this.statusRow() }
                { this.hasWon ? (<h1>You Won!! <button onClick={this.reset}>Reset?</button></h1>  ) : "" }
                { this.hasLost ? (<h1>You Lost!! <button onClick={this.reset}>Reset?</button></h1>  ) : "" }
                <h3>Secret Combination: <button onClick={this.toggleCombination}>{this.state.showCombination ? "Hide" : "Show" } </button></h3>
                <table className="board_table"><tbody><tr>
                { this.state.showCombination ? this.combination.map((circle, idx) => <td key={idx}><img className="large_circle" src={circle.color} alt={circle.colorName}/></td>) : ""}
                </tr></tbody></table>
                <div style={{height: `${height}px`}}>&nbsp;</div>
                <MasterTable mastermindArray={this.state.mastermindArray} feedbackArray={this.state.feedbackArray } feedbackCircles={this.feedbackCircles} setCircle={this.setCircle} />
                <Palette paletteColors={this.paletteColors} selectedPaletteCircle={this.selectedPaletteCircle}  />

            </div>
        )

    }
}

export default Mastermind;
