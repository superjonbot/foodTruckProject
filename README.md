# ENGINEERING-ASSESSMENT ★ Jonathan Robles

This is a node.js api to retrieve food trucks within a given area
when it is run, it take two parameters, an address to use as the centerpoint, and a radius in miles from that point to search.
for example :

address: Jackson Playground, San Francisco, CA 94107
radius: 1 (mile)

would return all the foodtrucks within a 1 mile radius of Jackson Playground


## Install and start the node API

npm install
npm run dev

The server should start on port 4000


## Import the Postman Tests (in the tests folder)

This would give 6 tests,
• bad email
• bad address
• bad radius given
• success returning one result
• success with many results
• too far error


## notes to reviewers
• In general I create the postman tests for the qa team
• jest tests have been omitted for the sake of time, I would normally have those in the tests directory
• normally no node_modules are in the repo but I left @globalstuff which has my lint/prettier settings for transparency
• I would also normally create a front end for this, probably with next.js and also use the google mapping api to map the trucks visibly on search if this was a real project.