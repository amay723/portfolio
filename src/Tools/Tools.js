import React from "react";

import './Tools.css'
// import {Link} from "react-router-dom";

function Tools() {

    document.title = 'Tools';

    return (
        <div>
            <h2>My Tools</h2>

            <h4>Planned Releases</h4>
            <ul>
                <li>Cryptography (decryption and encryption)</li>
                <ul>
                    <li>Vigenere Cipher</li>
                    <li>Other Cipher</li>
                </ul>
                <li>Pokemon.com video scraper</li>
                <li>Prime Number thing with Sieve of Erastocles</li>
                <li>Knapsack Problem</li>
                <li>Sudoku Solver (anything using A*), or some other 480 projs</li>
            </ul>

        </div>
    );
}

export default Tools;