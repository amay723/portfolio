import React from "react";

import '../../Tools.css'

import Code from './Code.gs'

function ContactFormInstructions() {

    document.title = 'Contact Web Form Instructions';

    return (
        <div>
            <h2>Contact Web Form Instructions Setup (Requires GMail account)</h2>

            <ol>
                <li>Go to <a className="tool-link" href="https://script.google.com/" target="_blank" rel="noopener noreferrer">https://script.google.com/</a></li>
                <li>Create a New Script</li>
                <li>Replace everything in the Code.gs editor file with the contents <a className="tool-link" href={Code} target="_blank" rel="noopener noreferrer">here</a></li>
                <ul>
                    <li>Note: the function name doPost means that this script will handle POST requests.
                        Change the name to doGet to change support to GET requests. You may have both doGet and doPost
                        functions to have support for both
                    </li>
                </ul>
                <li>Select Publish > Deploy as web app</li>
                <li>Make sure to set:</li>
                <ul>
                    <li>Execute this app as: "Me" </li>
                    <li>Who has access to the app: "Anyone, even anonymous"</li>
                </ul>
                <li>Click Deploy. The first time deploying this app you will need to authorize the app to run with your
                    account. Follow the prompts and your app should be live.</li>
                <ul>
                    <li>NOTE: Each revision you make to the app must be published the same way, with the change that
                    Project Version should be set to "New"</li>
                </ul>
                <li>Now, in your HTML &lt;form&gt; you should have its target set to
                    https://script.google.com/macros/s/???/exec (the web app link)
                </li>
            </ol>

        </div>
    );
}

export default ContactFormInstructions;