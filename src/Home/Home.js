import React from "react";

import DOB from './DOB';

// SOURCE: https://jsfiddle.net/naveen/UH9fT/
function calculateAge() {

    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }

    return age;
}

function Home() {

    document.title = 'Home';

    return (
        <div>
            <h3>My Home</h3>
            <p>I am {calculateAge()} years old. I graduated from Sonoma State University in Spring, 2019 with a B.S.
                in Computer Science and a Minor in Mathematics.
            </p>
            <p>
                I am a backend web-developer and React Native mobile developer.
            </p>
        </div>
    );
}

export default Home;