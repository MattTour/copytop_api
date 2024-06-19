import makeApp from './app.js';
import database from './database/database.js';
import './models/associations.js'

const app = makeApp();
console.log(database.models);
database.sync({alter: true, logging: console.log})
    .then(() => {
        app.listen(5001, () => console.log('listen on port 5001'));
    })
