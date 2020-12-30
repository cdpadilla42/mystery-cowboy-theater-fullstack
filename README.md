# Mystery Cowboy Theater

## Demo Link

[View app in browser](https://mystery-cowboy-theater.herokuapp.com/theater/The-Domain)

## Full Stack MERN App for ordering tickets and performing CRUD operations

Mystery Cowboy Theater is a fictional single screen theater that loves showing exclusively [Mystery Science Theater 3000](https://en.wikipedia.org/wiki/Mystery_Science_Theater_3000) films and episodes! This application displays a movie selector, current ticket order, and a movie editor.

This project fulfills all CRUD operations in two areas: ticket orders and films being screened. After being populated by the database, the two larger states are contained in the app component and data is shared down to the other supporting components to allow instant updating app-wide. State is maintained through two means: local storage for ticket orders and MongoDB for movie showings.

Tech used:

- React
- MongoDB
- Mongoose ORM
- NodeJS
- Express
- Custom SCSS
- Passport
- BcryptJS
- Deployed to Heroku

## Back-End and Front-End Communication

My aim with this project was to bring together React and the Express backend into one application. Since my last major React project, I planned to add complexity with multiple components needing the same state data, making the project more modular, and hooking the app up with a database. Structurally, the app is contained within one Node project, with the front end’s subdirectory being run through a specific script in the package.json file. The two points communicate with each other through a REST API served up by the Express server and queried by the front end with axios.

## Secure Authentication

Editing movies requires being logged in as the theater owner. There are both client and server side security measures to ensure that the appropriate user is authenticated before editing. While contained within the same project, the authentication process treats the front-end and back-end as separate entities needing to communicate with one another. The best solution for this was to use JSON Web Tokens. I’ve used Passport to implement the creation and authentication of the token that users send in request headers through axios. To ensure passwords remain secure, bcrypt was brought into the project to encrypt newly created passwords and decode login requests.
