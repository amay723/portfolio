import React from "react";

import './Projects.css'

// Ideas:
// For each project, have it be a rectangular box with image on the left, circular buttons
// somewhere with a horizontal chain looking link to live version (with live version hover text too)
// and github logo for source code

// ideas: crypto stuff

// Include all projects here
const proj = [
    {
        title: "ChefUp",
        link: "https://github.com/amay723/ChefUp",
        icon: require('./icons/ChefUpLogo.png'),
        description: "Mobile application written in React Native"
    },
    {
        title: "RideShare",
        link: "https://github.com/amay723/RideShare",
        icon: require('./icons/RideShareLogo.png'),
        description: "Entry for the SSU 2019 Hachathon"
    }
];

function Projects() {
    return (
        <div>
            <h3>My Projects (WIP)</h3>

            {
                proj.map( (itm, idx) => {
                    return (<div className="App-projects">
                        <h4 style={{color: 'brown'}}>{itm.title}</h4>
                        <img alt="Project Logo" src={itm.icon} />
                        <a target="_blank" rel="noopener noreferrer" href={itm.link}>
                            <svg className="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32"
                                 aria-hidden="true">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </a>
                        <p>{itm.description}</p>
                    </div>)
                })
            }
        </div>
    );
}

export default Projects;