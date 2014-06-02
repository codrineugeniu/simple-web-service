simple-web-service
==================

Simple node.js web service.

#Setup
Clone repository & `npm install`

#Usage
Start the app:

`node index.js`

Then make a request using:

`curl -vX POST localhost:5000 -d @test/req.json --header "Content-Type: application/json"`


#Testing
First, make sure you have Mocha installed.

`npm install -g mocha`

CD to folder & run tests:

`mocha --reporter spec`

or depending on your cup of tea:

`mocha --reporter nyan`
