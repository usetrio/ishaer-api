# ishaer-api

## Steps to run the app

1. Change directory:
   
   ``$ cd ishaer-api``
2. Install dependencies:
     
     ``$ npm install``
3. Run the app:
     
     ``$ DEBUG=ishaer-api:* npm start``
     
     or
     
     ``env "DEBUG=ishaer-api:**" npm start``

**NOTE:** Remember to create a .env file in the root folder, see ``.env-example`` for more information.

## Project folder structure

This project was generate with express-generator, see the documentation [here](https://expressjs.com/es/starter/generator.html)

- bin: In this folder we have the start point of our app with the file www.
- config: This folder is for any configuration file or DB scripts.
- models: Here we can save all the database models.
- public: This is a public folder to save scripts or stylesheets for the templates or views.
- routes: This folder is for the storage of all our routes, we have a index file for the primary routes, and for the future an user routes file.
- scripts: Here we can save differents functions to make our code more clean.
- views: Template folder.
