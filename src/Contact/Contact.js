import React from "react";

import './Contact.css'

const FormDescriptionMaxLength = 500;

function Contact() {
    return (
        <div className="App-about">

            <h4>Send me a message! I will get back to you as soon as I can</h4>

            <form name="contact-me-form" className="App-about-contact-form"
                  onSubmit={submitForm}
                  action='https://script.google.com/macros/s/AKfycbxBZGTk8h6taKFGgDGPo7GI9Opz437cN1KyigOG6gxUjXTy_To/exec'
                  method="post"
                  target="hiddenFrame"
            >

                Name: <input className="form-element" type="text" name="name" placeholder="Name" maxLength={20} required/><br />
                Email: <input className="form-element" type="email" name="email" placeholder="Email" maxLength={20} required/><br />

                <textarea
                    className="App-about-contact-description"
                    name="description"
                    placeholder="Description"
                    maxLength={FormDescriptionMaxLength}
                    onKeyUp={textAreaCounter}
                    required
                /><br />
                <p id="counter" className="App-about-contact-form-counter">{FormDescriptionMaxLength}</p>

                <p id="submitted" className="form-submitted">Sent!</p>

                <button className="form-submit-button" type="submit">Submit</button>
            </form>

            {/* The response from the form will be redirected to this hidden iframe, to prevent the page from
            redirecting to the form response page */}
            <iframe title="hiddenFrame" name="hiddenFrame"/>

        </div>
    );
}

// Shows how many more characters can be typed in the textarea
function textAreaCounter() {

    let textField = document.forms["contact-me-form"]["description"];
    let counterField = document.getElementById('counter');

    counterField.textContent = (textField.maxLength - textField.value.length).toString();
}


function submitForm(event) {

    event.preventDefault();

    document.forms["contact-me-form"].submit();

    // Clear Form Values
    document.forms["contact-me-form"].reset();

    // Recheck description character count
    textAreaCounter();

    // Display a "Sent" message above button
    document.getElementById("submitted").style.display = "block";
}

export default Contact;