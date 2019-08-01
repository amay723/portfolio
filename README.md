Source Code for my github.io webpage

Used guide for publishing to GitHub Pages from here: https://github.com/gitname/react-gh-pages

### Some Problems I Faced
GitHub Pages does not support client-side routing, as described here: <br />
https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing


The workaround I used for this problem can be found here:  <br />
https://github.com/rafrex/spa-github-pages. 

All that was needed was to add a custom 404.html page and an extra support script in the index.html page.


Another, less hackey method I could have used is a [HashRouter](https://reacttraining.com/react-router/web/api/HashRouter). 
The main downside to this is that each sub-page would have a /#/ in the URL. The method I used creates a page redirect
which is noticeable in the browser URL for a fraction of a second. 