import React from "react";

import './Games.css'
import {Link} from "react-router-dom";


function Games() {

    document.title = 'Games';

    return (
        <div>
            <h2>My Games</h2>

            <ul>
                <li><Link className="tool-link" to='./games/snake'>Snake Game</Link> (WIP)</li>
                <li><Link className="tool-link" to='/games/mastermind'>Mastermind</Link> (Puzzle Game)</li>
            </ul>

        </div>
    );
}

export default Games;